package hjow.game.xcard;

import android.app.Activity;
import android.webkit.JavascriptInterface;

public class XCardInterface {
    Activity activity;
    public XCardInterface(Activity activity) {
        this.activity = activity;
    }
    @JavascriptInterface
    public void exit() {
        activity.finishAffinity();
    }
}
