package jetgui;

import jetgui.JetContext;

class JetContextHelper {

	public static function onCloseButton(ctx: JetContext): Void {
		ctx.notify("close");
	}
}