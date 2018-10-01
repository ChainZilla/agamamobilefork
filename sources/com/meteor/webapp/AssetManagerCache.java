package com.meteor.webapp;

import android.content.res.AssetManager;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.Map;

class AssetManagerCache {
    private static final String LOG_TAG = "MeteorWebApp";
    private AssetManager assetManager;
    private Map<String, String[]> listCache;

    public AssetManagerCache(AssetManager assetManager) throws IOException {
        Throwable th;
        this.assetManager = assetManager;
        ObjectInputStream inputStream = null;
        try {
            ObjectInputStream inputStream2 = new ObjectInputStream(assetManager.open("cdvasset.manifest"));
            try {
                this.listCache = (Map) inputStream2.readObject();
                if (inputStream2 != null) {
                    try {
                        inputStream2.close();
                        inputStream = inputStream2;
                        return;
                    } catch (IOException e) {
                        inputStream = inputStream2;
                        return;
                    }
                }
            } catch (ClassNotFoundException e2) {
                inputStream = inputStream2;
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (IOException e3) {
                    }
                }
            } catch (Throwable th2) {
                th = th2;
                inputStream = inputStream2;
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (IOException e4) {
                    }
                }
                throw th;
            }
        } catch (ClassNotFoundException e5) {
            if (inputStream != null) {
                inputStream.close();
            }
        } catch (Throwable th3) {
            th = th3;
            if (inputStream != null) {
                inputStream.close();
            }
            throw th;
        }
    }

    public final String[] list(String path) {
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        if (path.endsWith("/")) {
            path = path.substring(0, path.length() - 1);
        }
        return (String[]) this.listCache.get(path);
    }

    public boolean exists(String path) {
        String parentPath;
        String filename;
        int parentEndIndex = path.lastIndexOf("/");
        if (parentEndIndex == -1) {
            parentPath = "";
            filename = path;
        } else {
            parentPath = path.substring(0, parentEndIndex);
            filename = path.substring(parentEndIndex + 1);
        }
        String[] children = list(parentPath);
        if (children == null) {
            return false;
        }
        for (String child : children) {
            if (child.equals(filename)) {
                return true;
            }
        }
        return false;
    }
}
