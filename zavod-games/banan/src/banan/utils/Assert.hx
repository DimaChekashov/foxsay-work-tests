package banan.utils;

import banan.basis.tools.Macroses;
import haxe.Json;
import haxe.macro.Expr;

using haxe.macro.Tools;

class Assert {		

	static public macro function assert(expr: ExprOf<Bool>, 
										?message: ExprOf<String>, 
										?scopeExcerpt: ExprOf<Dynamic>, 
										?typeCode: ExprOf<Int>): ExprOf<Void> {
#if display
		return macro null;
#end
		var exprString: String = StringTools.replace(expr.toString(), '||', 'OR');
		var errorMessageExpr: ExprOf<String> = macro $v{exprString};

		if (!Macroses.isNullExpr(message)) {
			
			var messageExpr: ExprOf<String> = Macroses.formatString(message);
			errorMessageExpr = macro $errorMessageExpr+": "+$messageExpr;
		}
		
		if (Macroses.isNullExpr(typeCode)) {
			typeCode = macro banan.error.ErrorType.assert;
		}
		
		var resultExpr: Expr = macro {

			if (!($expr)) {
				banan.error.Error.throwCustom($typeCode, $errorMessageExpr, $scopeExcerpt);
			}
		}
		
		return Macroses.setPos(expr.pos, resultExpr);
	}
	
	static public macro function notNull<T>(expr: ExprOf<Null<T>>, 
											?message: ExprOf<String>,
											?scopeExcerpt: ExprOf<Dynamic>,
											?typeCode: ExprOf<Int>): ExprOf<T> {
#if display
		return macro null;
#end
		var exprString: String = StringTools.replace(expr.toString(), '||', 'OR');
		var errorMessageExpr: ExprOf<String> = macro $v{exprString}+' is null';

		if (!Macroses.isNullExpr(message)) {
			
			var messageExpr: ExprOf<String> = Macroses.formatString(message);
			errorMessageExpr = macro $errorMessageExpr+": "+$messageExpr;
		}
		
		if (Macroses.isNullExpr(typeCode)) {
			typeCode = macro banan.error.ErrorType.assert;
		}
		
		var resultExpr: Expr = macro {
			var tmp = $expr;
			if (tmp == null) {
				banan.error.Error.throwCustom($typeCode, $errorMessageExpr, $scopeExcerpt);
			}
			tmp;
		}
		
		return Macroses.setPos(expr.pos, resultExpr);
	}
}

