package banan.basis.tools;
#if macro
import Type as RuntimeType;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.MacroStringTools;
import haxe.macro.Type;

using haxe.macro.Tools;

class Macroses {

	static public function formatPos(pos:Position):String {
		var s = Std.string(pos);
		s = s.substring(5, s.length - 1);
		return StringTools.replace(s, ' characters ', '');
	}

	static public function setPos(pos:Position, expr:Expr):Expr {
		
		function set(expr:Expr) {
			
			// https://github.com/HaxeFoundation/haxe/issues/8966
			if(expr.expr.match(EConst(CString(_)))) {
				expr = formatString(expr);
			}
			
			expr.pos = pos;
			expr.iter(set);
		}
		set(expr);
		return expr;
	}
	
	/**
	 * Проверяет является ли выражение выражением null:
	 * В макро методы на месте опциональных аргументов передается не null а его Expr.
	 */
	static public function isNullExpr(expr:Expr):Bool {
		return expr.expr.match(ExprDef.EConst(Constant.CIdent('null')));
	}
	
	//TODO может упасть на Context.typeExpr() - отследить и исправить
	/**
	 * Пытается вернуть оригинальный Expr вместо Expr(@:this this):
	 * В макро статические расширения первым аргументом передается особый Expr(@:this this)
	 * http://haxe.org/manual/macro-limitations-static-extension.html
	 */
	static public function getExprOfThis(thisExpr:Expr):Expr {
		return switch (thisExpr.expr) {
			case ExprDef.EMeta({ name: ':this' } , { expr: EConst(CIdent('this')) }):
				Context.getTypedExpr(Context.typeExpr(thisExpr));
			default:
				thisExpr;
		}
	}
	
	static public function getTypeByTypeExpr(eType:ExprOf<Class<Dynamic>>):Type {
		var typeName = eType.toString();
		var type = try {
			Context.getType(typeName);
		}  catch (err:String) {
			Context.error(err, eType.pos);
		}
		return type;
	}
	
	static public function unwrapClassTypeFromClass(type:Class<Dynamic>):ClassType {
		var type = Context.getType(RuntimeType.getClassName(type));
		return switch(type) {
			case Type.TInst(t, _): t.get();
			default: throw '"$type" isn\'t a TInst for unwraping ClassType';
		}
	}
	
	static public function getTypePathExpr(type: Type): Expr {
		var ct = type.toComplexType();
		switch(ct) {
			case ComplexType.TPath(p):
				
				var arr = p.pack.copy();
				
				arr.push(p.name);
				
				if (p.sub != null) {
					arr.push(p.sub);
				}
				
				var e: Expr = macro $i{arr[0]};
				
				for (i in 1...arr.length) {
					var s = arr[i];
					e = macro $e.$s;
				}
				
				return e;
				
			default: throw('not TPath');
		}
	}
	
	static public function formatString(expr: ExprOf<String>): ExprOf<String> {
		
		if (MacroStringTools.isFormatExpr(expr)) {
			switch(expr.expr) {
				
				case EConst(CString(string)): 
					expr = MacroStringTools.formatString(string, expr.pos);
				
				default:
					throw 'This should not happen. isFormatExpr should return true only for string literals\n' + formatPos(expr.pos) + '\n' + expr.toString();
			}
		}
		
		return expr;
	}
	
}
#end