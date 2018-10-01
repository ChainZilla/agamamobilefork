package org.apache.cordova.statusbar;

import android.graphics.Color;
import android.os.Build.VERSION;
import android.support.v4.widget.ExploreByTouchHelper;
import android.view.View;
import android.view.Window;
import java.util.Arrays;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONException;

public class StatusBar extends CordovaPlugin {
    private static final String TAG = "StatusBar";

    /* renamed from: org.apache.cordova.statusbar.StatusBar$6 */
    class C02076 implements Runnable {
        C02076() {
        }

        public void run() {
            StatusBar.this.setStatusBarStyle("default");
        }
    }

    /* renamed from: org.apache.cordova.statusbar.StatusBar$7 */
    class C02087 implements Runnable {
        C02087() {
        }

        public void run() {
            StatusBar.this.setStatusBarStyle("lightcontent");
        }
    }

    /* renamed from: org.apache.cordova.statusbar.StatusBar$8 */
    class C02098 implements Runnable {
        C02098() {
        }

        public void run() {
            StatusBar.this.setStatusBarStyle("blacktranslucent");
        }
    }

    /* renamed from: org.apache.cordova.statusbar.StatusBar$9 */
    class C02109 implements Runnable {
        C02109() {
        }

        public void run() {
            StatusBar.this.setStatusBarStyle("blackopaque");
        }
    }

    public void initialize(final CordovaInterface cordova, CordovaWebView webView) {
        LOG.m18v(TAG, "StatusBar: initialization");
        super.initialize(cordova, webView);
        this.cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                cordova.getActivity().getWindow().clearFlags(2048);
                StatusBar.this.setStatusBarBackgroundColor(StatusBar.this.preferences.getString("StatusBarBackgroundColor", "#000000"));
                StatusBar.this.setStatusBarStyle(StatusBar.this.preferences.getString("StatusBarStyle", "lightcontent"));
            }
        });
    }

    public boolean execute(String action, final CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        boolean statusBarVisible = false;
        LOG.m18v(TAG, "Executing action: " + action);
        final Window window = this.cordova.getActivity().getWindow();
        if ("_ready".equals(action)) {
            if ((window.getAttributes().flags & 1024) == 0) {
                statusBarVisible = true;
            }
            callbackContext.sendPluginResult(new PluginResult(Status.OK, statusBarVisible));
            return true;
        } else if ("show".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (VERSION.SDK_INT >= 19) {
                        window.getDecorView().setSystemUiVisibility((window.getDecorView().getSystemUiVisibility() & -1025) & -5);
                    }
                    window.clearFlags(1024);
                }
            });
            return true;
        } else if ("hide".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (VERSION.SDK_INT >= 19) {
                        window.getDecorView().setSystemUiVisibility((window.getDecorView().getSystemUiVisibility() | 1024) | 4);
                    }
                    window.addFlags(1024);
                }
            });
            return true;
        } else if ("backgroundColorByHexString".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        StatusBar.this.setStatusBarBackgroundColor(args.getString(0));
                    } catch (JSONException e) {
                        LOG.m12e(StatusBar.TAG, "Invalid hexString argument, use f.i. '#777777'");
                    }
                }
            });
            return true;
        } else if ("overlaysWebView".equals(action)) {
            if (VERSION.SDK_INT >= 21) {
                this.cordova.getActivity().runOnUiThread(new Runnable() {
                    public void run() {
                        try {
                            StatusBar.this.setStatusBarTransparent(args.getBoolean(0));
                        } catch (JSONException e) {
                            LOG.m12e(StatusBar.TAG, "Invalid boolean argument");
                        }
                    }
                });
                return true;
            } else if (args.getBoolean(0)) {
                return false;
            } else {
                return true;
            }
        } else if ("styleDefault".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new C02076());
            return true;
        } else if ("styleLightContent".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new C02087());
            return true;
        } else if ("styleBlackTranslucent".equals(action)) {
            this.cordova.getActivity().runOnUiThread(new C02098());
            return true;
        } else if (!"styleBlackOpaque".equals(action)) {
            return false;
        } else {
            this.cordova.getActivity().runOnUiThread(new C02109());
            return true;
        }
    }

    private void setStatusBarBackgroundColor(String colorPref) {
        if (VERSION.SDK_INT >= 21 && colorPref != null && !colorPref.isEmpty()) {
            Window window = this.cordova.getActivity().getWindow();
            window.clearFlags(67108864);
            window.addFlags(ExploreByTouchHelper.INVALID_ID);
            try {
                window.getClass().getMethod("setStatusBarColor", new Class[]{Integer.TYPE}).invoke(window, new Object[]{Integer.valueOf(Color.parseColor(colorPref))});
            } catch (IllegalArgumentException e) {
                LOG.m12e(TAG, "Invalid hexString argument, use f.i. '#999999'");
            } catch (Exception e2) {
                LOG.m21w(TAG, "Method window.setStatusBarColor not found for SDK level " + VERSION.SDK_INT);
            }
        }
    }

    private void setStatusBarTransparent(boolean transparent) {
        if (VERSION.SDK_INT >= 21) {
            Window window = this.cordova.getActivity().getWindow();
            if (transparent) {
                window.getDecorView().setSystemUiVisibility(1280);
                window.setStatusBarColor(0);
                return;
            }
            window.getDecorView().setSystemUiVisibility(256);
        }
    }

    private void setStatusBarStyle(String style) {
        if (VERSION.SDK_INT >= 23 && style != null && !style.isEmpty()) {
            View decorView = this.cordova.getActivity().getWindow().getDecorView();
            int uiOptions = decorView.getSystemUiVisibility();
            String[] lightContentStyles = new String[]{"lightcontent", "blacktranslucent", "blackopaque"};
            if (Arrays.asList(new String[]{"default"}).contains(style.toLowerCase())) {
                decorView.setSystemUiVisibility(uiOptions | 8192);
            } else if (Arrays.asList(lightContentStyles).contains(style.toLowerCase())) {
                decorView.setSystemUiVisibility(uiOptions & -8193);
            } else {
                LOG.m12e(TAG, "Invalid style, must be either 'default', 'lightcontent' or the deprecated 'blacktranslucent' and 'blackopaque'");
            }
        }
    }
}
