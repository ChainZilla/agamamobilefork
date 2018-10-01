package com.meteor.webapp;

import android.net.Uri;
import android.util.Log;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import okhttp3.Call;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request.Builder;
import okhttp3.Response;
import org.apache.cordova.CordovaResourceApi;

class AssetBundleManager {
    private static final String LOG_TAG = "MeteorWebApp";
    private AssetBundleDownloader assetBundleDownloader;
    private Callback callback;
    private final File downloadDirectory;
    private final Map<String, AssetBundle> downloadedAssetBundlesByVersion = new HashMap();
    private final OkHttpClient httpClient;
    public final AssetBundle initialAssetBundle;
    private final File partialDownloadDirectory;
    private AssetBundle partiallyDownloadedAssetBundle;
    private final CordovaResourceApi resourceApi;
    private final File versionsDirectory;
    private final WebAppConfiguration webAppConfiguration;

    public interface Callback {
        void onError(Throwable th);

        void onFinishedDownloadingAssetBundle(AssetBundle assetBundle);

        boolean shouldDownloadBundleForManifest(AssetManifest assetManifest);
    }

    public AssetBundleManager(CordovaResourceApi resourceApi, WebAppConfiguration webAppConfiguration, AssetBundle initialAssetBundle, File versionsDirectory) throws WebAppException {
        this.resourceApi = resourceApi;
        this.webAppConfiguration = webAppConfiguration;
        this.initialAssetBundle = initialAssetBundle;
        this.versionsDirectory = versionsDirectory;
        this.downloadDirectory = new File(versionsDirectory, "Downloading");
        this.partialDownloadDirectory = new File(versionsDirectory, "PartialDownload");
        loadDownloadedAssetBundles();
        this.httpClient = new OkHttpClient();
    }

    private void loadDownloadedAssetBundles() throws WebAppException {
        for (File file : this.versionsDirectory.listFiles()) {
            if (!(this.downloadDirectory.equals(file) || this.partialDownloadDirectory.equals(file) || !file.isDirectory())) {
                AssetBundle assetBundle = new AssetBundle(this.resourceApi, Uri.fromFile(file), null, this.initialAssetBundle);
                this.downloadedAssetBundlesByVersion.put(assetBundle.getVersion(), assetBundle);
            }
        }
    }

    public void setCallback(Callback callback) {
        this.callback = callback;
    }

    public synchronized AssetBundle downloadedAssetBundleWithVersion(String version) {
        return (AssetBundle) this.downloadedAssetBundlesByVersion.get(version);
    }

    public void checkForUpdates(final HttpUrl baseUrl) {
        this.httpClient.newCall(new Builder().url(baseUrl.resolve("manifest.json")).build()).enqueue(new okhttp3.Callback() {
            public void onFailure(Call call, IOException e) {
                if (!call.isCanceled()) {
                    AssetBundleManager.this.didFail(new WebAppException("Error downloading asset manifest", e));
                }
            }

            public void onResponse(Call call, Response response) {
                if (response.isSuccessful()) {
                    try {
                        byte[] manifestBytes = response.body().bytes();
                        AssetManifest manifest = new AssetManifest(new String(manifestBytes));
                        String version = manifest.version;
                        Log.d("MeteorWebApp", "Downloaded asset manifest for version: " + version);
                        if (AssetBundleManager.this.assetBundleDownloader != null && AssetBundleManager.this.assetBundleDownloader.getAssetBundle().getVersion().equals(version)) {
                            Log.w("MeteorWebApp", "Already downloading asset bundle version: " + version);
                            return;
                        } else if (AssetBundleManager.this.callback == null || AssetBundleManager.this.callback.shouldDownloadBundleForManifest(manifest)) {
                            if (AssetBundleManager.this.assetBundleDownloader != null) {
                                AssetBundleManager.this.assetBundleDownloader.cancel();
                            }
                            AssetBundleManager.this.assetBundleDownloader = null;
                            if (AssetBundleManager.this.initialAssetBundle.getVersion().equals(version)) {
                                AssetBundleManager.this.didFinishDownloadingAssetBundle(AssetBundleManager.this.initialAssetBundle);
                                return;
                            }
                            AssetBundle downloadedAssetBundle = AssetBundleManager.this.downloadedAssetBundleWithVersion(version);
                            if (downloadedAssetBundle != null) {
                                AssetBundleManager.this.didFinishDownloadingAssetBundle(downloadedAssetBundle);
                                return;
                            }
                            AssetBundleManager.this.moveExistingDownloadDirectoryIfNeeded();
                            if (AssetBundleManager.this.downloadDirectory.mkdir()) {
                                try {
                                    IOUtils.writeToFile(manifestBytes, new File(AssetBundleManager.this.downloadDirectory, "program.json"));
                                    try {
                                        AssetBundleManager.this.downloadAssetBundle(new AssetBundle(AssetBundleManager.this.resourceApi, Uri.fromFile(AssetBundleManager.this.downloadDirectory), manifest, AssetBundleManager.this.initialAssetBundle), baseUrl);
                                        return;
                                    } catch (WebAppException e) {
                                        AssetBundleManager.this.didFail(e);
                                        return;
                                    }
                                } catch (IOException e2) {
                                    AssetBundleManager.this.didFail(e2);
                                    return;
                                }
                            }
                            AssetBundleManager.this.didFail(new IOException("Could not create download directory"));
                            return;
                        } else {
                            return;
                        }
                    } catch (WebAppException e3) {
                        AssetBundleManager.this.didFail(e3);
                        return;
                    } catch (IOException e22) {
                        AssetBundleManager.this.didFail(e22);
                        return;
                    }
                }
                AssetBundleManager.this.didFail(new WebAppException("Non-success status code " + response.code() + "for asset manifest"));
            }
        });
    }

    private void moveExistingDownloadDirectoryIfNeeded() {
        if (this.downloadDirectory.exists()) {
            if (this.partialDownloadDirectory.exists() && !IOUtils.deleteRecursively(this.partialDownloadDirectory)) {
                Log.w("MeteorWebApp", "Could not delete partial download directory");
            }
            this.partiallyDownloadedAssetBundle = null;
            if (this.downloadDirectory.renameTo(this.partialDownloadDirectory)) {
                try {
                    this.partiallyDownloadedAssetBundle = new AssetBundle(this.resourceApi, Uri.fromFile(this.partialDownloadDirectory), this.initialAssetBundle);
                    return;
                } catch (Exception e) {
                    Log.w("MeteorWebApp", "Could not load partially downloaded asset bundle", e);
                    return;
                }
            }
            Log.w("MeteorWebApp", "Could not rename existing download directory");
        }
    }

    public boolean isDownloading() {
        return this.assetBundleDownloader != null;
    }

    protected synchronized void downloadAssetBundle(final AssetBundle assetBundle, HttpUrl baseUrl) {
        Set<Asset> missingAssets = new HashSet();
        for (Asset asset : assetBundle.getOwnAssets()) {
            File containingDirectory = asset.getFile().getParentFile();
            if (!containingDirectory.exists() && !containingDirectory.mkdirs()) {
                didFail(new IOException("Could not create containing directory: " + containingDirectory));
                break;
            }
            Asset cachedAsset = cachedAssetForAsset(asset);
            if (cachedAsset != null) {
                try {
                    this.resourceApi.copyResource(cachedAsset.getFileUri(), asset.getFileUri());
                } catch (IOException e) {
                    didFail(e);
                }
            } else {
                missingAssets.add(asset);
            }
        }
        if (missingAssets.isEmpty()) {
            didFinishDownloadingAssetBundle(assetBundle);
        } else {
            this.assetBundleDownloader = new AssetBundleDownloader(this.webAppConfiguration, assetBundle, baseUrl, missingAssets);
            this.assetBundleDownloader.setCallback(new com.meteor.webapp.AssetBundleDownloader.Callback() {
                public void onFinished() {
                    AssetBundleManager.this.assetBundleDownloader = null;
                    AssetBundleManager.this.moveDownloadedAssetBundleIntoPlace(assetBundle);
                    AssetBundleManager.this.didFinishDownloadingAssetBundle(assetBundle);
                }

                public void onFailure(Throwable cause) {
                    AssetBundleManager.this.didFail(cause);
                }
            });
            this.assetBundleDownloader.resume();
        }
    }

    protected void didFinishDownloadingAssetBundle(AssetBundle assetBundle) {
        this.assetBundleDownloader = null;
        if (this.callback != null) {
            this.callback.onFinishedDownloadingAssetBundle(assetBundle);
        }
    }

    protected void didFail(Throwable cause) {
        this.assetBundleDownloader = null;
        if (this.callback != null) {
            this.callback.onError(cause);
        }
    }

    protected Asset cachedAssetForAsset(Asset asset) {
        for (AssetBundle assetBundle : this.downloadedAssetBundlesByVersion.values()) {
            Asset cachedAsset = assetBundle.cachedAssetForUrlPath(asset.urlPath, asset.hash);
            if (cachedAsset != null) {
                return cachedAsset;
            }
        }
        if (this.partiallyDownloadedAssetBundle != null) {
            cachedAsset = this.partiallyDownloadedAssetBundle.cachedAssetForUrlPath(asset.urlPath, asset.hash);
            if (cachedAsset != null && cachedAsset.getFile().exists()) {
                return cachedAsset;
            }
        }
        return null;
    }

    protected synchronized void moveDownloadedAssetBundleIntoPlace(AssetBundle assetBundle) {
        String version = assetBundle.getVersion();
        File versionDirectory = new File(this.versionsDirectory, version);
        this.downloadDirectory.renameTo(versionDirectory);
        assetBundle.didMoveToDirectoryAtUri(Uri.fromFile(versionDirectory));
        this.downloadedAssetBundlesByVersion.put(version, assetBundle);
    }

    synchronized void removeAllDownloadedAssetBundlesExceptForVersion(String versionToKeep) {
        Iterator<AssetBundle> iterator = this.downloadedAssetBundlesByVersion.values().iterator();
        while (iterator.hasNext()) {
            String version = ((AssetBundle) iterator.next()).getVersion();
            if (!version.equals(versionToKeep)) {
                IOUtils.deleteRecursively(new File(this.versionsDirectory, version));
                iterator.remove();
            }
        }
    }

    File getDownloadDirectory() {
        return this.downloadDirectory;
    }
}
