package com.meteor.webapp;

import android.net.Uri;
import android.util.Log;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.cordova.CordovaResourceApi;
import org.json.JSONException;
import org.json.JSONObject;

class AssetBundle {
    private static final String LOG_TAG = "MeteorWebApp";
    static final Pattern runtimeConfigPattern = Pattern.compile("__meteor_runtime_config__ = JSON.parse\\(decodeURIComponent\\(\"([^\"]*)\"\\)\\)");
    private String appId;
    private final String cordovaCompatibilityVersion;
    private Uri directoryUri;
    private Asset indexFile;
    private Map<String, Asset> ownAssetsByURLPath;
    private final AssetBundle parentAssetBundle;
    private final CordovaResourceApi resourceApi;
    private String rootUrlString;
    private JSONObject runtimeConfig;
    private final String version;

    final class Asset {
        final boolean cacheable;
        final String filePath;
        final String fileType;
        final String hash;
        final String sourceMapUrlPath;
        final String urlPath;

        Asset(String filePath, String urlPath, String fileType, boolean cacheable, String hash, String sourceMapUrlPath) {
            this.filePath = filePath;
            this.urlPath = urlPath;
            this.fileType = fileType;
            this.cacheable = cacheable;
            this.hash = hash;
            this.sourceMapUrlPath = sourceMapUrlPath;
        }

        public Uri getFileUri() {
            return Uri.withAppendedPath(AssetBundle.this.directoryUri, this.filePath);
        }

        public File getFile() {
            return AssetBundle.this.resourceApi.mapUriToFile(getFileUri());
        }

        public String toString() {
            return this.urlPath;
        }
    }

    public AssetBundle(CordovaResourceApi resourceApi, Uri directoryUri) throws WebAppException {
        this(resourceApi, directoryUri, null, null);
    }

    public AssetBundle(CordovaResourceApi resourceApi, Uri directoryUri, AssetBundle parentAssetBundle) throws WebAppException {
        this(resourceApi, directoryUri, null, parentAssetBundle);
    }

    /* JADX WARNING: inconsistent code. */
    /* Code decompiled incorrectly, please refer to instructions dump. */
    public AssetBundle(org.apache.cordova.CordovaResourceApi r16, android.net.Uri r17, com.meteor.webapp.AssetManifest r18, com.meteor.webapp.AssetBundle r19) throws com.meteor.webapp.WebAppException {
        /*
        r15 = this;
        r15.<init>();
        r0 = r16;
        r15.resourceApi = r0;
        r0 = r17;
        r15.directoryUri = r0;
        r0 = r19;
        r15.parentAssetBundle = r0;
        if (r18 != 0) goto L_0x0015;
    L_0x0011:
        r18 = r15.loadAssetManifest();
    L_0x0015:
        r0 = r18;
        r2 = r0.version;
        r15.version = r2;
        r0 = r18;
        r2 = r0.cordovaCompatibilityVersion;
        r15.cordovaCompatibilityVersion = r2;
        r2 = new java.util.HashMap;
        r2.<init>();
        r15.ownAssetsByURLPath = r2;
        r0 = r18;
        r2 = r0.entries;
        r13 = r2.iterator();
    L_0x0030:
        r2 = r13.hasNext();
        if (r2 == 0) goto L_0x008d;
    L_0x0036:
        r14 = r13.next();
        r14 = (com.meteor.webapp.AssetManifest.Entry) r14;
        r2 = r14.urlPath;
        r2 = android.net.Uri.parse(r2);
        r4 = r2.getPath();
        if (r19 == 0) goto L_0x0052;
    L_0x0048:
        r2 = r14.hash;
        r0 = r19;
        r2 = r0.cachedAssetForUrlPath(r4, r2);
        if (r2 != 0) goto L_0x0065;
    L_0x0052:
        r1 = new com.meteor.webapp.AssetBundle$Asset;
        r3 = r14.filePath;
        r5 = r14.fileType;
        r6 = r14.cacheable;
        r7 = r14.hash;
        r8 = r14.sourceMapUrlPath;
        r2 = r15;
        r1.<init>(r3, r4, r5, r6, r7, r8);
        r15.addAsset(r1);
    L_0x0065:
        r2 = r14.sourceMapFilePath;
        if (r2 == 0) goto L_0x0030;
    L_0x0069:
        r2 = r14.sourceMapUrlPath;
        if (r2 == 0) goto L_0x0030;
    L_0x006d:
        if (r19 == 0) goto L_0x007a;
    L_0x006f:
        r2 = r14.sourceMapUrlPath;
        r3 = 0;
        r0 = r19;
        r2 = r0.cachedAssetForUrlPath(r2, r3);
        if (r2 != 0) goto L_0x0030;
    L_0x007a:
        r5 = new com.meteor.webapp.AssetBundle$Asset;
        r7 = r14.sourceMapFilePath;
        r8 = r14.sourceMapUrlPath;
        r9 = "json";
        r10 = 1;
        r11 = 0;
        r12 = 0;
        r6 = r15;
        r5.<init>(r7, r8, r9, r10, r11, r12);
        r15.addAsset(r5);
        goto L_0x0030;
    L_0x008d:
        r6 = new com.meteor.webapp.AssetBundle$Asset;
        r8 = "index.html";
        r9 = "/";
        r10 = "html";
        r11 = 0;
        r12 = 0;
        r13 = 0;
        r7 = r15;
        r6.<init>(r8, r9, r10, r11, r12, r13);
        r15.addAsset(r6);
        r15.indexFile = r6;
        return;
        */
        throw new UnsupportedOperationException("Method not decompiled: com.meteor.webapp.AssetBundle.<init>(org.apache.cordova.CordovaResourceApi, android.net.Uri, com.meteor.webapp.AssetManifest, com.meteor.webapp.AssetBundle):void");
    }

    protected void addAsset(Asset asset) {
        this.ownAssetsByURLPath.put(asset.urlPath, asset);
    }

    public Set<Asset> getOwnAssets() {
        return new HashSet(this.ownAssetsByURLPath.values());
    }

    public Asset assetForUrlPath(String urlPath) {
        Asset asset = (Asset) this.ownAssetsByURLPath.get(urlPath);
        if (asset != null || this.parentAssetBundle == null) {
            return asset;
        }
        return this.parentAssetBundle.assetForUrlPath(urlPath);
    }

    public Asset cachedAssetForUrlPath(String urlPath, String hash) {
        Asset asset = (Asset) this.ownAssetsByURLPath.get(urlPath);
        if (asset == null) {
            return null;
        }
        if (asset.cacheable && hash == null) {
            return asset;
        }
        if (asset.hash == null || !asset.hash.equals(hash)) {
            return null;
        }
        return asset;
    }

    public String getVersion() {
        return this.version;
    }

    public String getCordovaCompatibilityVersion() {
        return this.cordovaCompatibilityVersion;
    }

    public Asset getIndexFile() {
        return this.indexFile;
    }

    public JSONObject getRuntimeConfig() {
        if (this.runtimeConfig == null) {
            this.runtimeConfig = loadRuntimeConfig(getIndexFile().getFileUri());
        }
        return this.runtimeConfig;
    }

    public String getAppId() {
        if (this.appId == null) {
            JSONObject runtimeConfig = getRuntimeConfig();
            if (runtimeConfig != null) {
                try {
                    this.appId = runtimeConfig.getString("appId");
                } catch (JSONException e) {
                    Log.w("MeteorWebApp", "Error reading APP_ID from runtime config", e);
                }
            }
        }
        return this.appId;
    }

    public String getRootUrlString() {
        if (this.rootUrlString == null) {
            JSONObject runtimeConfig = getRuntimeConfig();
            if (runtimeConfig != null) {
                try {
                    this.rootUrlString = runtimeConfig.getString("ROOT_URL");
                } catch (JSONException e) {
                    Log.w("MeteorWebApp", "Error reading ROOT_URL from runtime config", e);
                }
            }
        }
        return this.rootUrlString;
    }

    void didMoveToDirectoryAtUri(Uri directoryUri) {
        this.directoryUri = directoryUri;
    }

    private AssetManifest loadAssetManifest() throws WebAppException {
        try {
            return new AssetManifest(stringFromUri(Uri.withAppendedPath(this.directoryUri, "program.json")));
        } catch (IOException e) {
            throw new WebAppException("Error loading asset manifest", e);
        }
    }

    JSONObject loadRuntimeConfig(Uri uri) {
        try {
            Matcher matcher = runtimeConfigPattern.matcher(stringFromUri(uri));
            if (matcher.find()) {
                return new JSONObject(URLDecoder.decode(matcher.group(1), "UTF-8"));
            }
            Log.e("MeteorWebApp", "Could not find runtime config in index file");
            return null;
        } catch (IOException e) {
            Log.e("MeteorWebApp", "Error loading index file", e);
            return null;
        } catch (IllegalStateException e2) {
            Log.e("MeteorWebApp", "Could not find runtime config in index file", e2);
            return null;
        } catch (JSONException e3) {
            Log.e("MeteorWebApp", "Error parsing runtime config", e3);
            return null;
        }
    }

    private String stringFromUri(Uri uri) throws IOException {
        InputStream inputStream = null;
        try {
            inputStream = this.resourceApi.openForRead(uri, true).inputStream;
            String stringFromInputStream = IOUtils.stringFromInputStream(inputStream);
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                }
            }
            return stringFromInputStream;
        } catch (Throwable th) {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e2) {
                }
            }
        }
    }
}
