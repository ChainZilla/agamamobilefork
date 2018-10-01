package com.meteor.webapp;

import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

final class AssetManifest {
    private static final String LOG_TAG = "MeteorWebApp";
    final String cordovaCompatibilityVersion;
    final List<Entry> entries;
    final String version;

    static final class Entry {
        final boolean cacheable;
        final String filePath;
        final String fileType;
        final String hash;
        final String sourceMapFilePath;
        final String sourceMapUrlPath;
        final String urlPath;

        Entry(String filePath, String urlPath, String fileType, boolean cacheable, String hash, String sourceMapFilePath, String sourceMapUrlPath) {
            this.filePath = filePath;
            this.urlPath = urlPath;
            this.fileType = fileType;
            this.cacheable = cacheable;
            this.hash = hash;
            this.sourceMapFilePath = sourceMapFilePath;
            this.sourceMapUrlPath = sourceMapUrlPath;
        }
    }

    public AssetManifest(String string) throws WebAppException {
        try {
            JSONObject jSONObject = new JSONObject(string);
            String format = jSONObject.optString("format", null);
            if (format == null || format.equals("web-program-pre1")) {
                this.version = jSONObject.getString("version");
                this.cordovaCompatibilityVersion = jSONObject.getJSONObject("cordovaCompatibilityVersions").getString("android");
                JSONArray entriesJSON = jSONObject.getJSONArray("manifest");
                this.entries = new ArrayList(entriesJSON.length());
                for (int i = 0; i < entriesJSON.length(); i++) {
                    JSONObject entryJSON = entriesJSON.getJSONObject(i);
                    if (entryJSON.getString("where").equals("client")) {
                        this.entries.add(new Entry(entryJSON.getString("path"), entryJSON.getString("url"), entryJSON.getString("type"), entryJSON.getBoolean("cacheable"), entryJSON.optString("hash", null), entryJSON.optString("sourceMap", null), entryJSON.optString("sourceMapUrl", null)));
                    }
                }
                return;
            }
            throw new WebAppException("The asset manifest format is incompatible: " + format);
        } catch (JSONException e) {
            throw new WebAppException("Asset manifest does not have a cordovaCompatibilityVersion", e);
        } catch (JSONException e2) {
            throw new WebAppException("Asset manifest does not have a version", e2);
        } catch (JSONException e22) {
            throw new WebAppException("Error parsing asset manifest", e22);
        }
    }
}
