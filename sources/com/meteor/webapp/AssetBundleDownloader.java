package com.meteor.webapp;

import android.net.Uri;
import android.util.Log;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import okhttp3.Call;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.OkHttpClient.Builder;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONException;
import org.json.JSONObject;

class AssetBundleDownloader {
    private static final String LOG_TAG = "MeteorWebApp";
    static final Pattern eTagWithSha1HashPattern = Pattern.compile("\"([0-9a-f]{40})\"");
    private final AssetBundle assetBundle;
    private final Set<Asset> assetsDownloading;
    private final HttpUrl baseUrl;
    private Callback callback;
    private boolean canceled;
    private final OkHttpClient httpClient = new Builder().cache(null).build();
    private final Set<Asset> missingAssets;
    private final WebAppConfiguration webAppConfiguration;

    public interface Callback {
        void onFailure(Throwable th);

        void onFinished();
    }

    public AssetBundleDownloader(WebAppConfiguration webAppConfiguration, AssetBundle assetBundle, HttpUrl baseUrl, Set<Asset> missingAssets) {
        this.webAppConfiguration = webAppConfiguration;
        this.assetBundle = assetBundle;
        this.baseUrl = baseUrl;
        this.httpClient.dispatcher().setMaxRequestsPerHost(6);
        this.missingAssets = Collections.synchronizedSet(missingAssets);
        this.assetsDownloading = Collections.synchronizedSet(new HashSet());
    }

    public AssetBundle getAssetBundle() {
        return this.assetBundle;
    }

    public void setCallback(Callback callback) {
        this.callback = callback;
    }

    public void resume() {
        Log.d("MeteorWebApp", "Start downloading assets from bundle with version: " + this.assetBundle.getVersion());
        synchronized (this.missingAssets) {
            for (final Asset asset : this.missingAssets) {
                if (!this.assetsDownloading.contains(asset)) {
                    this.assetsDownloading.add(asset);
                    this.httpClient.newCall(new Request.Builder().url(downloadUrlForAsset(asset)).build()).enqueue(new okhttp3.Callback() {
                        public void onFailure(Call call, IOException e) {
                            AssetBundleDownloader.this.assetsDownloading.remove(asset);
                            if (!call.isCanceled()) {
                                AssetBundleDownloader.this.didFail(new WebAppException("Error downloading asset: " + asset, e));
                            }
                        }

                        public void onResponse(Call call, Response response) throws IOException {
                            AssetBundleDownloader.this.assetsDownloading.remove(asset);
                            try {
                                AssetBundleDownloader.this.verifyResponse(response, asset);
                                try {
                                    IOUtils.writeToFile(response.body().source(), asset.getFile());
                                    if (asset.filePath.equals("index.html")) {
                                        JSONObject runtimeConfig = AssetBundleDownloader.this.assetBundle.getRuntimeConfig();
                                        if (runtimeConfig != null) {
                                            try {
                                                AssetBundleDownloader.this.verifyRuntimeConfig(runtimeConfig);
                                            } catch (WebAppException e) {
                                                AssetBundleDownloader.this.didFail(e);
                                                return;
                                            }
                                        }
                                    }
                                    AssetBundleDownloader.this.missingAssets.remove(asset);
                                    if (AssetBundleDownloader.this.missingAssets.isEmpty()) {
                                        Log.d("MeteorWebApp", "Finished downloading new asset bundle version: " + AssetBundleDownloader.this.assetBundle.getVersion());
                                        if (AssetBundleDownloader.this.callback != null) {
                                            AssetBundleDownloader.this.callback.onFinished();
                                        }
                                    }
                                } catch (IOException e2) {
                                    AssetBundleDownloader.this.didFail(e2);
                                }
                            } catch (WebAppException e3) {
                                AssetBundleDownloader.this.didFail(e3);
                            }
                        }
                    });
                }
            }
        }
    }

    protected HttpUrl downloadUrlForAsset(Asset asset) {
        String urlPath = asset.urlPath;
        if (urlPath.startsWith("/")) {
            urlPath = urlPath.substring(1);
        }
        HttpUrl.Builder builder = this.baseUrl.newBuilder(urlPath);
        if (!asset.filePath.equals("index.html")) {
            builder.addQueryParameter("meteor_dont_serve_index", "true");
        }
        return builder.build();
    }

    protected void verifyResponse(Response response, Asset asset) throws WebAppException {
        if (response.isSuccessful()) {
            String expectedHash = asset.hash;
            if (expectedHash != null) {
                String eTag = response.header("etag");
                if (eTag != null) {
                    Matcher matcher = eTagWithSha1HashPattern.matcher(eTag);
                    if (matcher.find() && !matcher.group(1).equals(expectedHash)) {
                        throw new WebAppException("Hash mismatch for asset: " + asset);
                    }
                    return;
                }
                return;
            }
            return;
        }
        throw new WebAppException("Non-success status code " + response.code() + " for asset: " + asset);
    }

    protected void verifyRuntimeConfig(JSONObject runtimeConfig) throws WebAppException {
        String expectedVersion = this.assetBundle.getVersion();
        String actualVersion = runtimeConfig.optString("autoupdateVersionCordova", null);
        if (actualVersion == null || actualVersion.equals(expectedVersion)) {
            try {
                String rootUrlString = runtimeConfig.getString("ROOT_URL");
                Uri rootUrl = Uri.parse(rootUrlString);
                if ("localhost".equals(Uri.parse(this.webAppConfiguration.getRootUrlString()).getHost()) || !"localhost".equals(rootUrl.getHost())) {
                    try {
                        if (!runtimeConfig.getString("appId").equals(this.webAppConfiguration.getAppId())) {
                            throw new WebAppException("appId in downloaded asset bundle does not match current appId. Make sure the server at " + rootUrlString + " is serving the right app.");
                        }
                        return;
                    } catch (JSONException e) {
                        throw new WebAppException("Could not find appId in downloaded asset bundle");
                    }
                }
                throw new WebAppException("ROOT_URL in downloaded asset bundle would change current ROOT_URL to localhost. Make sure ROOT_URL has been configured correctly on the server.");
            } catch (JSONException e2) {
                throw new WebAppException("Could not find ROOT_URL in downloaded asset bundle");
            }
        }
        throw new WebAppException("Version mismatch for index page, expected: " + expectedVersion + ", actual: " + actualVersion);
    }

    protected void didFail(Throwable cause) {
        if (!this.canceled) {
            cancel();
            if (this.callback != null) {
                this.callback.onFailure(cause);
            }
        }
    }

    public void cancel() {
        this.canceled = true;
        this.httpClient.dispatcher().cancelAll();
    }
}
