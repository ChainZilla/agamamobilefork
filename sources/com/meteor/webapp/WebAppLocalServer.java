package com.meteor.webapp;

import android.content.res.AssetManager;
import android.net.Uri;
import android.net.Uri.Builder;
import android.util.Log;
import com.meteor.webapp.AssetBundleManager.Callback;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import okhttp3.HttpUrl;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.Config;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.CordovaResourceApi.OpenForReadResult;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

public class WebAppLocalServer extends CordovaPlugin implements Callback {
    private static final String LOCAL_FILESYSTEM_PATH = "/local-filesystem";
    private static final String LOG_TAG = "MeteorWebApp";
    public static final String PREFS_NAME = "MeteorWebApp";
    private Uri applicationDirectoryUri;
    private AssetBundleManager assetBundleManager;
    private AssetManager assetManager;
    private AssetManagerCache assetManagerCache;
    private WebAppConfiguration configuration;
    private AssetBundle currentAssetBundle;
    private CallbackContext errorCallbackContext;
    private String launchUrl;
    private int localServerPort;
    private CallbackContext newVersionReadyCallbackContext;
    private AssetBundle pendingAssetBundle;
    private CordovaResourceApi resourceApi;
    private List<WebResourceHandler> resourceHandlers;
    private long startupTimeout;
    private Timer startupTimer;
    private TestingDelegate testingDelegate;
    private Uri wwwDirectoryUri;

    /* renamed from: com.meteor.webapp.WebAppLocalServer$1 */
    class C01321 extends TimerTask {
        C01321() {
        }

        public void run() {
            Log.w("MeteorWebApp", "App startup timed out, reverting to last known good version");
            WebAppLocalServer.this.revertToLastKnownGoodVersion();
        }
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$3 */
    class C01343 implements Runnable {
        C01343() {
        }

        public void run() {
            WebAppLocalServer.this.assetBundleManager.removeAllDownloadedAssetBundlesExceptForVersion(WebAppLocalServer.this.currentAssetBundle.getVersion());
        }
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$4 */
    class C01354 implements Runnable {
        C01354() {
        }

        public void run() {
            WebAppLocalServer.this.webView.loadUrlIntoView(WebAppLocalServer.this.launchUrl, false);
        }
    }

    public interface TestingDelegate {
        boolean execute(String str, JSONArray jSONArray, CallbackContext callbackContext) throws JSONException;
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$5 */
    class C02505 implements WebResourceHandler {
        C02505() {
        }

        public Uri remapUri(Uri uri) {
            if (WebAppLocalServer.this.currentAssetBundle == null) {
                return null;
            }
            Asset asset = WebAppLocalServer.this.currentAssetBundle.assetForUrlPath(uri.getPath());
            if (asset != null) {
                return asset.getFileUri();
            }
            return null;
        }
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$6 */
    class C02516 implements WebResourceHandler {
        C02516() {
        }

        public Uri remapUri(Uri uri) {
            if (WebAppLocalServer.this.assetManagerCache == null) {
                return null;
            }
            String path = uri.getPath();
            if (path.startsWith("/application")) {
                return null;
            }
            if (path.startsWith("/")) {
                path = path.substring(1);
            }
            if (WebAppLocalServer.this.assetManagerCache.exists("www/" + path)) {
                return Uri.withAppendedPath(WebAppLocalServer.this.wwwDirectoryUri, path);
            }
            return null;
        }
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$7 */
    class C02527 implements WebResourceHandler {
        C02527() {
        }

        public Uri remapUri(Uri uri) {
            String path = uri.getPath();
            if (!path.startsWith(WebAppLocalServer.LOCAL_FILESYSTEM_PATH)) {
                return null;
            }
            return new Builder().scheme("file").appendPath(path.substring(WebAppLocalServer.LOCAL_FILESYSTEM_PATH.length())).build();
        }
    }

    /* renamed from: com.meteor.webapp.WebAppLocalServer$8 */
    class C02538 implements WebResourceHandler {
        C02538() {
        }

        public Uri remapUri(Uri uri) {
            if (WebAppLocalServer.this.currentAssetBundle == null) {
                return null;
            }
            String path = uri.getPath();
            if (path.startsWith(WebAppLocalServer.LOCAL_FILESYSTEM_PATH) || path.equals("/favicon.ico")) {
                return null;
            }
            Asset asset = WebAppLocalServer.this.currentAssetBundle.getIndexFile();
            if (asset != null) {
                return asset.getFileUri();
            }
            return null;
        }
    }

    WebAppConfiguration getConfiguration() {
        return this.configuration;
    }

    CordovaResourceApi getResourceApi() {
        return this.resourceApi;
    }

    AssetBundleManager getAssetBundleManager() {
        return this.assetBundleManager;
    }

    AssetManagerCache getAssetManagerCache() {
        return this.assetManagerCache;
    }

    public void pluginInitialize() {
        super.pluginInitialize();
        this.resourceApi = this.webView.getResourceApi();
        this.wwwDirectoryUri = Uri.parse("file:///android_asset/www");
        this.applicationDirectoryUri = Uri.withAppendedPath(this.wwwDirectoryUri, "application");
        this.launchUrl = Config.getStartUrl();
        this.localServerPort = this.preferences.getInteger("WebAppLocalServerPort", Uri.parse(this.launchUrl).getPort());
        this.startupTimeout = (long) this.preferences.getInteger("WebAppStartupTimeout", 20000);
        this.configuration = new WebAppConfiguration(this.cordova.getActivity().getSharedPreferences("MeteorWebApp", 0));
        this.assetManager = this.cordova.getActivity().getAssets();
        try {
            this.assetManagerCache = new AssetManagerCache(this.assetManager);
            try {
                initializeAssetBundles();
                this.resourceHandlers = new ArrayList();
                initializeResourceHandlers();
            } catch (WebAppException e) {
                Log.e("MeteorWebApp", "Could not initialize asset bundles", e);
            }
        } catch (IOException e2) {
            Log.e("MeteorWebApp", "Could not load asset manager cache", e2);
        }
    }

    void initializeAssetBundles() throws WebAppException {
        AssetBundle initialAssetBundle = new AssetBundle(this.resourceApi, this.applicationDirectoryUri);
        File versionsDirectory = new File(this.cordova.getActivity().getFilesDir(), "meteor");
        if (!initialAssetBundle.getVersion().equals(this.configuration.getLastSeenInitialVersion())) {
            Log.d("MeteorWebApp", "Detected new bundled version, removing versions directory if it exists");
            if (versionsDirectory.exists() && !IOUtils.deleteRecursively(versionsDirectory)) {
                Log.w("MeteorWebApp", "Could not remove versions directory");
            }
            this.configuration.reset();
        }
        this.configuration.setLastSeenInitialVersion(initialAssetBundle.getVersion());
        if (versionsDirectory.exists() || versionsDirectory.mkdirs()) {
            this.assetBundleManager = new AssetBundleManager(this.resourceApi, this.configuration, initialAssetBundle, versionsDirectory);
            this.assetBundleManager.setCallback(this);
            String lastDownloadedVersion = this.configuration.getLastDownloadedVersion();
            if (lastDownloadedVersion != null) {
                this.currentAssetBundle = this.assetBundleManager.downloadedAssetBundleWithVersion(lastDownloadedVersion);
                if (this.currentAssetBundle == null) {
                    this.currentAssetBundle = initialAssetBundle;
                } else if (!this.configuration.getLastKnownGoodVersion().equals(lastDownloadedVersion)) {
                    startStartupTimer();
                }
            } else {
                this.currentAssetBundle = initialAssetBundle;
            }
            this.pendingAssetBundle = null;
            return;
        }
        Log.e("MeteorWebApp", "Could not create versions directory");
    }

    public void onReset() {
        super.onReset();
        this.newVersionReadyCallbackContext = null;
        this.errorCallbackContext = null;
        if (this.pendingAssetBundle != null) {
            this.currentAssetBundle = this.pendingAssetBundle;
            this.pendingAssetBundle = null;
        }
        Log.i("MeteorWebApp", "Serving asset bundle with version: " + this.currentAssetBundle.getVersion());
        this.configuration.setAppId(this.currentAssetBundle.getAppId());
        this.configuration.setRootUrlString(this.currentAssetBundle.getRootUrlString());
        this.configuration.setCordovaCompatibilityVersion(this.currentAssetBundle.getCordovaCompatibilityVersion());
        if (this.testingDelegate == null) {
            startStartupTimer();
        }
    }

    private void startStartupTimer() {
        removeStartupTimer();
        this.startupTimer = new Timer();
        this.startupTimer.schedule(new C01321(), this.startupTimeout);
    }

    private void removeStartupTimer() {
        if (this.startupTimer != null) {
            this.startupTimer.cancel();
            this.startupTimer = null;
        }
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("checkForUpdates".equals(action)) {
            checkForUpdates(callbackContext);
            return true;
        } else if ("onNewVersionReady".equals(action)) {
            onNewVersionReady(callbackContext);
            return true;
        } else if ("onError".equals(action)) {
            onError(callbackContext);
            return true;
        } else if ("startupDidComplete".equals(action)) {
            startupDidComplete(callbackContext);
            return true;
        } else if (this.testingDelegate != null) {
            return this.testingDelegate.execute(action, args, callbackContext);
        } else {
            return false;
        }
    }

    private void checkForUpdates(final CallbackContext callbackContext) {
        this.cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                HttpUrl rootUrl = HttpUrl.parse(WebAppLocalServer.this.currentAssetBundle.getRootUrlString());
                if (rootUrl == null) {
                    callbackContext.error("checkForUpdates requires a rootURL to be configured");
                    return;
                }
                WebAppLocalServer.this.assetBundleManager.checkForUpdates(rootUrl.resolve("__cordova/"));
                callbackContext.success();
            }
        });
    }

    private void onNewVersionReady(CallbackContext callbackContext) {
        PluginResult pluginResult = new PluginResult(Status.NO_RESULT);
        pluginResult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginResult);
        this.newVersionReadyCallbackContext = callbackContext;
    }

    private void notifyNewVersionReady(String version) {
        if (this.newVersionReadyCallbackContext != null) {
            PluginResult pluginResult = new PluginResult(Status.OK, version);
            pluginResult.setKeepCallback(true);
            this.newVersionReadyCallbackContext.sendPluginResult(pluginResult);
        }
    }

    private void onError(CallbackContext callbackContext) {
        PluginResult pluginResult = new PluginResult(Status.NO_RESULT);
        pluginResult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginResult);
        this.errorCallbackContext = callbackContext;
    }

    private void notifyError(Throwable cause) {
        Log.e("MeteorWebApp", "Download failure", cause);
        if (this.errorCallbackContext != null) {
            PluginResult pluginResult = new PluginResult(Status.OK, cause.getMessage());
            pluginResult.setKeepCallback(true);
            this.errorCallbackContext.sendPluginResult(pluginResult);
        }
    }

    private void startupDidComplete(CallbackContext callbackContext) {
        removeStartupTimer();
        this.configuration.setLastKnownGoodVersion(this.currentAssetBundle.getVersion());
        this.cordova.getThreadPool().execute(new C01343());
        callbackContext.success();
    }

    private void revertToLastKnownGoodVersion() {
        this.configuration.addBlacklistedVersion(this.currentAssetBundle.getVersion());
        String lastKnownGoodVersion = this.configuration.getLastKnownGoodVersion();
        if (lastKnownGoodVersion != null) {
            AssetBundle assetBundle = this.assetBundleManager.downloadedAssetBundleWithVersion(lastKnownGoodVersion);
            if (assetBundle != null) {
                this.pendingAssetBundle = assetBundle;
            }
        } else if (!this.currentAssetBundle.equals(this.assetBundleManager.initialAssetBundle)) {
            this.pendingAssetBundle = this.assetBundleManager.initialAssetBundle;
        }
        if (this.pendingAssetBundle != null) {
            this.cordova.getActivity().runOnUiThread(new C01354());
        }
    }

    public boolean shouldDownloadBundleForManifest(AssetManifest manifest) {
        String version = manifest.version;
        if (this.currentAssetBundle.getVersion().equals(version)) {
            Log.i("MeteorWebApp", "Skipping downloading current version: " + version);
            return false;
        } else if (this.pendingAssetBundle != null && this.pendingAssetBundle.getVersion().equals(version)) {
            Log.i("MeteorWebApp", "Skipping downloading pending version: " + version);
            return false;
        } else if (this.configuration.getBlacklistedVersions().contains(version)) {
            notifyError(new WebAppException("Skipping downloading blacklisted version: " + version));
            return false;
        } else if (this.configuration.getCordovaCompatibilityVersion().equals(manifest.cordovaCompatibilityVersion)) {
            return true;
        } else {
            notifyError(new WebAppException("Skipping downloading new version because the Cordova platform version or plugin versions have changed and are potentially incompatible"));
            return false;
        }
    }

    public void onFinishedDownloadingAssetBundle(AssetBundle assetBundle) {
        this.configuration.setLastDownloadedVersion(assetBundle.getVersion());
        this.pendingAssetBundle = assetBundle;
        notifyNewVersionReady(assetBundle.getVersion());
    }

    public void onError(Throwable cause) {
        Log.w("MeteorWebApp", "Download failure", cause);
        notifyError(cause);
    }

    private void initializeResourceHandlers() {
        this.resourceHandlers.add(new C02505());
        this.resourceHandlers.add(new C02516());
        this.resourceHandlers.add(new C02527());
        this.resourceHandlers.add(new C02538());
    }

    public Uri remapUri(Uri uri) {
        if (!uri.getScheme().equals("http") || !uri.getHost().equals("localhost") || uri.getPort() != this.localServerPort) {
            return null;
        }
        Uri remappedUri = null;
        for (WebResourceHandler handler : this.resourceHandlers) {
            remappedUri = handler.remapUri(uri);
            if (remappedUri != null) {
                break;
            }
        }
        return remappedUri == null ? toPluginUri(uri) : remappedUri;
    }

    public OpenForReadResult handleOpenForRead(Uri uri) throws IOException {
        return new OpenForReadResult(fromPluginUri(uri), null, null, 0, null);
    }

    void setTestingDelegate(TestingDelegate testingDelegate) {
        this.testingDelegate = testingDelegate;
    }
}
