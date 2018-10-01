package org.apache.cordova.splashscreen;

import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.content.res.ColorStateList;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build.VERSION;
import android.os.Handler;
import android.support.v4.view.ViewCompat;
import android.view.Display;
import android.view.View;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.Animation.AnimationListener;
import android.view.animation.DecelerateInterpolator;
import android.widget.ImageView;
import android.widget.ImageView.ScaleType;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.RelativeLayout.LayoutParams;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

public class SplashScreen extends CordovaPlugin {
    private static final int DEFAULT_FADE_DURATION = 500;
    private static final int DEFAULT_SPLASHSCREEN_DURATION = 3000;
    private static final boolean HAS_BUILT_IN_SPLASH_SCREEN;
    private static final String LOG_TAG = "SplashScreen";
    private static boolean firstShow = true;
    private static boolean lastHideAfterDelay;
    private static ProgressDialog spinnerDialog;
    private static Dialog splashDialog;
    private int orientation;
    private ImageView splashImageView;

    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$1 */
    class C01921 implements Runnable {
        C01921() {
        }

        public void run() {
            SplashScreen.this.getView().setVisibility(4);
        }
    }

    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$2 */
    class C01932 implements Runnable {
        C01932() {
        }

        public void run() {
            SplashScreen.this.webView.postMessage("splashscreen", "hide");
        }
    }

    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$3 */
    class C01943 implements Runnable {
        C01943() {
        }

        public void run() {
            SplashScreen.this.webView.postMessage("splashscreen", "show");
        }
    }

    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$6 */
    class C02006 implements Runnable {

        /* renamed from: org.apache.cordova.splashscreen.SplashScreen$6$1 */
        class C01991 implements OnCancelListener {
            C01991() {
            }

            public void onCancel(DialogInterface dialog) {
                SplashScreen.spinnerDialog = null;
            }
        }

        C02006() {
        }

        public void run() {
            SplashScreen.this.spinnerStop();
            SplashScreen.spinnerDialog = new ProgressDialog(SplashScreen.this.webView.getContext());
            SplashScreen.spinnerDialog.setOnCancelListener(new C01991());
            SplashScreen.spinnerDialog.setCancelable(false);
            SplashScreen.spinnerDialog.setIndeterminate(true);
            RelativeLayout centeredLayout = new RelativeLayout(SplashScreen.this.cordova.getActivity());
            centeredLayout.setGravity(17);
            centeredLayout.setLayoutParams(new LayoutParams(-2, -2));
            ProgressBar progressBar = new ProgressBar(SplashScreen.this.webView.getContext());
            LayoutParams layoutParams = new LayoutParams(-2, -2);
            layoutParams.addRule(13, -1);
            progressBar.setLayoutParams(layoutParams);
            if (VERSION.SDK_INT >= 21) {
                String colorName = SplashScreen.this.preferences.getString("SplashScreenSpinnerColor", null);
                if (colorName != null) {
                    int[][] states = new int[4][];
                    states[0] = new int[]{16842910};
                    states[1] = new int[]{-16842910};
                    states[2] = new int[]{-16842912};
                    states[3] = new int[]{16842919};
                    int progressBarColor = Color.parseColor(colorName);
                    progressBar.setIndeterminateTintList(new ColorStateList(states, new int[]{progressBarColor, progressBarColor, progressBarColor, progressBarColor}));
                }
            }
            centeredLayout.addView(progressBar);
            SplashScreen.spinnerDialog.getWindow().clearFlags(2);
            SplashScreen.spinnerDialog.getWindow().setBackgroundDrawable(new ColorDrawable(0));
            SplashScreen.spinnerDialog.show();
            SplashScreen.spinnerDialog.setContentView(centeredLayout);
        }
    }

    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$7 */
    class C02017 implements Runnable {
        C02017() {
        }

        public void run() {
            if (SplashScreen.spinnerDialog != null && SplashScreen.spinnerDialog.isShowing()) {
                SplashScreen.spinnerDialog.dismiss();
                SplashScreen.spinnerDialog = null;
            }
        }
    }

    static {
        boolean z = false;
        if (Integer.valueOf(CordovaWebView.CORDOVA_VERSION.split("\\.")[0]).intValue() < 4) {
            z = true;
        }
        HAS_BUILT_IN_SPLASH_SCREEN = z;
    }

    private View getView() {
        try {
            return (View) this.webView.getClass().getMethod("getView", new Class[0]).invoke(this.webView, new Object[0]);
        } catch (Exception e) {
            return (View) this.webView;
        }
    }

    private int getSplashId() {
        String splashResource = this.preferences.getString(LOG_TAG, "screen");
        if (splashResource == null) {
            return 0;
        }
        int drawableId = this.cordova.getActivity().getResources().getIdentifier(splashResource, "drawable", this.cordova.getActivity().getClass().getPackage().getName());
        if (drawableId == 0) {
            return this.cordova.getActivity().getResources().getIdentifier(splashResource, "drawable", this.cordova.getActivity().getPackageName());
        }
        return drawableId;
    }

    protected void pluginInitialize() {
        if (!HAS_BUILT_IN_SPLASH_SCREEN) {
            this.cordova.getActivity().runOnUiThread(new C01921());
            int drawableId = getSplashId();
            this.orientation = this.cordova.getActivity().getResources().getConfiguration().orientation;
            if (firstShow) {
                showSplashScreen(this.preferences.getBoolean("AutoHideSplashScreen", true));
            }
            if (this.preferences.getBoolean("SplashShowOnlyFirstTime", true)) {
                firstShow = false;
            }
        }
    }

    private boolean isMaintainAspectRatio() {
        return this.preferences.getBoolean("SplashMaintainAspectRatio", false);
    }

    private int getFadeDuration() {
        int fadeSplashScreenDuration = this.preferences.getBoolean("FadeSplashScreen", true) ? this.preferences.getInteger("FadeSplashScreenDuration", DEFAULT_FADE_DURATION) : 0;
        if (fadeSplashScreenDuration < 30) {
            return fadeSplashScreenDuration * 1000;
        }
        return fadeSplashScreenDuration;
    }

    public void onPause(boolean multitasking) {
        if (!HAS_BUILT_IN_SPLASH_SCREEN) {
            removeSplashScreen(true);
        }
    }

    public void onDestroy() {
        if (!HAS_BUILT_IN_SPLASH_SCREEN) {
            removeSplashScreen(true);
        }
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("hide")) {
            this.cordova.getActivity().runOnUiThread(new C01932());
        } else if (!action.equals("show")) {
            return false;
        } else {
            this.cordova.getActivity().runOnUiThread(new C01943());
        }
        callbackContext.success();
        return true;
    }

    public Object onMessage(String id, Object data) {
        if (!HAS_BUILT_IN_SPLASH_SCREEN) {
            if ("splashscreen".equals(id)) {
                if ("hide".equals(data.toString())) {
                    removeSplashScreen(false);
                } else {
                    showSplashScreen(false);
                }
            } else if ("spinner".equals(id)) {
                if ("stop".equals(data.toString())) {
                    getView().setVisibility(0);
                }
            } else if ("onReceivedError".equals(id)) {
                spinnerStop();
            }
        }
        return null;
    }

    public void onConfigurationChanged(Configuration newConfig) {
        if (newConfig.orientation != this.orientation) {
            this.orientation = newConfig.orientation;
            if (this.splashImageView != null) {
                int drawableId = getSplashId();
                if (drawableId != 0) {
                    this.splashImageView.setImageDrawable(this.cordova.getActivity().getResources().getDrawable(drawableId));
                }
            }
        }
    }

    private void removeSplashScreen(final boolean forceHideImmediately) {
        this.cordova.getActivity().runOnUiThread(new Runnable() {

            /* renamed from: org.apache.cordova.splashscreen.SplashScreen$4$1 */
            class C01951 implements AnimationListener {
                C01951() {
                }

                public void onAnimationStart(Animation animation) {
                    SplashScreen.this.spinnerStop();
                }

                public void onAnimationEnd(Animation animation) {
                    if (SplashScreen.splashDialog != null && SplashScreen.splashDialog.isShowing()) {
                        SplashScreen.splashDialog.dismiss();
                        SplashScreen.splashDialog = null;
                        SplashScreen.this.splashImageView = null;
                    }
                }

                public void onAnimationRepeat(Animation animation) {
                }
            }

            public void run() {
                if (SplashScreen.splashDialog != null && SplashScreen.splashDialog.isShowing()) {
                    int fadeSplashScreenDuration = SplashScreen.this.getFadeDuration();
                    if (fadeSplashScreenDuration <= 0 || forceHideImmediately) {
                        SplashScreen.this.spinnerStop();
                        SplashScreen.splashDialog.dismiss();
                        SplashScreen.splashDialog = null;
                        SplashScreen.this.splashImageView = null;
                        return;
                    }
                    AlphaAnimation fadeOut = new AlphaAnimation(1.0f, 0.0f);
                    fadeOut.setInterpolator(new DecelerateInterpolator());
                    fadeOut.setDuration((long) fadeSplashScreenDuration);
                    SplashScreen.this.splashImageView.setAnimation(fadeOut);
                    SplashScreen.this.splashImageView.startAnimation(fadeOut);
                    fadeOut.setAnimationListener(new C01951());
                }
            }
        });
    }

    private void showSplashScreen(final boolean hideAfterDelay) {
        int splashscreenTime = this.preferences.getInteger("SplashScreenDelay", DEFAULT_SPLASHSCREEN_DURATION);
        final int drawableId = getSplashId();
        final int effectiveSplashDuration = Math.max(0, splashscreenTime - getFadeDuration());
        lastHideAfterDelay = hideAfterDelay;
        if (!this.cordova.getActivity().isFinishing()) {
            if ((splashDialog != null && splashDialog.isShowing()) || drawableId == 0) {
                return;
            }
            if (splashscreenTime > 0 || !hideAfterDelay) {
                this.cordova.getActivity().runOnUiThread(new Runnable() {

                    /* renamed from: org.apache.cordova.splashscreen.SplashScreen$5$1 */
                    class C01971 implements Runnable {
                        C01971() {
                        }

                        public void run() {
                            if (SplashScreen.lastHideAfterDelay) {
                                SplashScreen.this.removeSplashScreen(false);
                            }
                        }
                    }

                    public void run() {
                        Display display = SplashScreen.this.cordova.getActivity().getWindowManager().getDefaultDisplay();
                        Context context = SplashScreen.this.webView.getContext();
                        SplashScreen.this.splashImageView = new ImageView(context);
                        SplashScreen.this.splashImageView.setImageResource(drawableId);
                        SplashScreen.this.splashImageView.setLayoutParams(new LinearLayout.LayoutParams(-1, -1));
                        SplashScreen.this.splashImageView.setMinimumHeight(display.getHeight());
                        SplashScreen.this.splashImageView.setMinimumWidth(display.getWidth());
                        SplashScreen.this.splashImageView.setBackgroundColor(SplashScreen.this.preferences.getInteger("backgroundColor", ViewCompat.MEASURED_STATE_MASK));
                        if (SplashScreen.this.isMaintainAspectRatio()) {
                            SplashScreen.this.splashImageView.setScaleType(ScaleType.CENTER_CROP);
                        } else {
                            SplashScreen.this.splashImageView.setScaleType(ScaleType.FIT_XY);
                        }
                        SplashScreen.splashDialog = new Dialog(context, 16973840);
                        if ((SplashScreen.this.cordova.getActivity().getWindow().getAttributes().flags & 1024) == 1024) {
                            SplashScreen.splashDialog.getWindow().setFlags(1024, 1024);
                        }
                        SplashScreen.splashDialog.setContentView(SplashScreen.this.splashImageView);
                        SplashScreen.splashDialog.setCancelable(false);
                        SplashScreen.splashDialog.show();
                        if (SplashScreen.this.preferences.getBoolean("ShowSplashScreenSpinner", true)) {
                            SplashScreen.this.spinnerStart();
                        }
                        if (hideAfterDelay) {
                            new Handler().postDelayed(new C01971(), (long) effectiveSplashDuration);
                        }
                    }
                });
            }
        }
    }

    private void spinnerStart() {
        this.cordova.getActivity().runOnUiThread(new C02006());
    }

    private void spinnerStop() {
        this.cordova.getActivity().runOnUiThread(new C02017());
    }
}
