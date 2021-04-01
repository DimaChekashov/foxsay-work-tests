package jetgui;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.ExprTools;
import haxe.macro.MacroStringTools;

class NullAccessError {
	public function new() {}
}

class SafeCode {

	public static macro function run(e: Expr): Expr {
		
		var safeE: Expr = makeSafeExpr(e, macro null);
		return safeE;
	}
	
#if macro	

	private static function makeSafeExpr(e: Expr, altExpr: Expr): Expr {
		
		var safeE: Expr = makeSafeSubExpr(e);
		return macro try $safeE catch (_: jetgui.SafeCode.NullAccessError) $altExpr;
	}
	
	private static function makeSafeSubExpr(e: Expr): Expr {
		
		return 
			switch (e) {
				
				case {expr: EConst(CString(s)), pos: pos} if (MacroStringTools.isFormatExpr(e)):
					makeSafeSubExpr(MacroStringTools.formatString(s, pos));
				
				case {expr: EFunction(_)}:
					// it's hard to prepare function code, 
					// because it's hard to find out if the function returns Void or some other type, 
					// and thus hard to generate return statement.
					// so just keep function untouched and add another SafeCode.run from jet2hx to function body
					e; 
				
				case macro $obj.$field = $val:
					var safeObj: Expr = makeSafeSubExpr(obj);
					var safeVal: Expr = makeSafeExpr(val, macro null);
					macro {
						var obj = $safeObj;
						if (obj == null) throw new jetgui.SafeCode.NullAccessError();
						obj.$field = $safeVal;
					}
				
				case macro $obj.$field:
					var safeObj = makeSafeSubExpr(obj);
					macro {
						var obj = $safeObj;
						if (obj == null) throw new jetgui.SafeCode.NullAccessError();
						obj.$field;
					}
					
				case {expr: ECall(fn, params)}:
					var safeFn = makeSafeSubExpr(fn);
					var safeParams = params.map(e -> makeSafeSubExpr(e));
					var callExpr = {expr: ECall(macro fn, safeParams), pos: e.pos};
					macro {
						var fn = $safeFn;
						fn != null ? $callExpr : null;
					}
					
				case macro $obj[$key]:
					var safeObj = makeSafeSubExpr(obj);
					macro {
						var obj = $safeObj;
						obj != null ? obj[$key] : null;
					}
					
				default:
					ExprTools.map(e, makeSafeSubExpr);
			}
	}
	
	private static function hasNonVoidReturn(e: Expr): Bool {
		
		var result: Bool = false;
		
		function check(e: Expr): Void {
			switch (e.expr) {
				case EReturn(e) if (e != null):
					result = true;
					
				default:
					ExprTools.iter(e, check);
			}
		}
		
		check(e);
		
		return result;
	}
	
#end
}