package com.meteor.webapp;

import android.content.SharedPreferences;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

class WebAppConfiguration {
    private SharedPreferences preferences;

    public WebAppConfiguration(SharedPreferences preferences) {
        this.preferences = preferences;
    }

    public String getAppId() {
        return this.preferences.getString("appId", null);
    }

    public void setAppId(String appId) {
        this.preferences.edit().putString("appId", appId).commit();
    }

    public String getRootUrlString() {
        return this.preferences.getString("rootUrl", null);
    }

    public void setRootUrlString(String rootUrlString) {
        this.preferences.edit().putString("rootUrl", rootUrlString).commit();
    }

    public String getCordovaCompatibilityVersion() {
        return this.preferences.getString("cordovaCompatibilityVersion", null);
    }

    public void setCordovaCompatibilityVersion(String version) {
        this.preferences.edit().putString("cordovaCompatibilityVersion", version).commit();
    }

    public String getLastDownloadedVersion() {
        return this.preferences.getString("lastDownloadedVersion", null);
    }

    public void setLastDownloadedVersion(String version) {
        this.preferences.edit().putString("lastDownloadedVersion", version).commit();
    }

    public String getLastSeenInitialVersion() {
        return this.preferences.getString("lastSeenInitialVersion", null);
    }

    public void setLastSeenInitialVersion(String version) {
        this.preferences.edit().putString("lastSeenInitialVersion", version).commit();
    }

    public String getLastKnownGoodVersion() {
        return this.preferences.getString("lastKnownGoodVersion", null);
    }

    public void setLastKnownGoodVersion(String version) {
        this.preferences.edit().putString("lastKnownGoodVersion", version).commit();
    }

    public Set<String> getBlacklistedVersions() {
        return this.preferences.getStringSet("blacklistedVersions", Collections.EMPTY_SET);
    }

    public void addBlacklistedVersion(String version) {
        Set<String> blacklistedVersions = new HashSet(getBlacklistedVersions());
        blacklistedVersions.add(version);
        this.preferences.edit().putStringSet("blacklistedVersions", blacklistedVersions).commit();
    }

    public void reset() {
        this.preferences.edit().clear().commit();
    }
}
