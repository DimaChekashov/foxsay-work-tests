package jetgui.vdom;

import haxe.Json;
import haxe.macro.Context;
import haxe.macro.Expr;

class VDomIdMacro {

	public static macro function makeId(): ExprOf<String> {
		
		var pos = Context.getPosInfos(Context.currentPos());
		var s: String = haxe.crypto.Md5.encode(Json.stringify(pos)).substr(0, 8);

		return macro $v{s};
	}
	
}