package banan.error;

import banan.math.M;
import haxe.CallStack;
import haxe.CallStack.StackItem;
import haxe.PosInfos;

#if macro
import banan.basis.tools.Macroses;
import haxe.macro.Context;
import haxe.macro.Expr.ExprOf;
import haxe.macro.Expr.Position;
import haxe.macro.Expr;

using banan.basis.tools.Macroses;
#end

using StringTools;
using banan.basis.NullHelper;

private typedef TError = {
	var typeCode: Int;
	var position: String;
	var message: String;
	var scope: Dynamic;
	var stack: Array<StackItem>;
}

class Error {
	
	private static inline var delimiter: String = ' : ';

	public static macro function create(typeCode: ExprOf<Int>,
										?message: ExprOf<String>,
										?scope: ExprOf<Dynamic>): Expr {
#if display
		return macro null;
#end
		if (message.isNullExpr()) {
			message = macro "";
		}
		message = Macroses.formatString(message);

		final position: Position = Context.currentPos();
		final formattedPosition: String = getShortPosition(Macroses.formatPos(position));
		final createExpr = macro @:privateAccess banan.error.Error.e($typeCode, $v{formattedPosition}, $message, $scope);
		
		return Macroses.setPos(position, createExpr);
	}

#if !macro
	public static function fromCallStack(typeCode: Int,
										stackPos: Int = 0,
										?message: String,
										?scope: Dynamic): Error {
		
		final stack: Array<StackItem> = getCallStack();
		final formattedPosition: String = 
			if (stack[stackPos] == null) {
				"unknown";
			} else {
				StringTools.replace(CallStack.toString([stack[stackPos]]), "\nCalled from ", "");
			}

		return e(typeCode, formattedPosition, message, scope, stack);
	}
#end

#if !macro
	public static function fromExceptionStack(typeCode: Int,
											stackPos: Int = 0,
											?message: String,
											?scope: Dynamic): Error {
		
		final stack: Array<StackItem> = getExceptionStack();
		final formattedPosition: String = 
			if (stack[stackPos] == null) {
				"unknown";
			} else {
				StringTools.replace(CallStack.toString([stack[stackPos]]), "\nCalled from ", "");
			}

		return e(typeCode, formattedPosition, message, scope, stack);
	}
#end

	public static macro function throwCustom(?typeCode: ExprOf<Int>,
											?message: ExprOf<String>,
											?scope: ExprOf<Dynamic>,
											?positionDescr: ExprOf<String>): Expr {
#if display
		return macro null;
#end
		if (typeCode.isNullExpr()) {
			typeCode = macro banan.error.ErrorType.generic;
		}
		if (message.isNullExpr()) {
			message = macro "";
		}
		message = Macroses.formatString(message);

		final contextPosition: Position = Context.currentPos();
		final formattedPosition: ExprOf<String> = 
			if (Macroses.isNullExpr(positionDescr)) {

				final shortenedContextPosition: String = getShortPosition(Macroses.formatPos(contextPosition));
				macro $v{shortenedContextPosition};
			} else {
				positionDescr;
			}

		final throwExpr = macro throw @:privateAccess banan.error.Error.e($typeCode, $formattedPosition, $message, $scope);
		return Macroses.setPos(contextPosition, throwExpr);
	}

	public static macro function throwCommon(message: ExprOf<String>, 
											?scope: ExprOf<Dynamic>, 
											?positionDescr: ExprOf<String>): Expr {
#if display
		return macro null;
#end
		final typeCode = macro banan.error.ErrorType.generic;
		message = Macroses.formatString(message);

		final contextPosition: Position = Context.currentPos();
		final formattedPosition: ExprOf<String> = 
			if (Macroses.isNullExpr(positionDescr)) {

				final shortenedContextPosition: String = getShortPosition(Macroses.formatPos(contextPosition));
				macro $v{shortenedContextPosition};
			} else {
				positionDescr;
			}

		final throwExpr = macro throw @:privateAccess banan.error.Error.e($typeCode, $formattedPosition, $message, $scope);
		return Macroses.setPos(contextPosition, throwExpr);
	}

	public static macro function throwNotImplemented(?message: ExprOf<String>, ?scope: ExprOf<Dynamic>): Expr {
#if display
		return macro null;
#end
		final typeCode = macro banan.error.ErrorType.notImplemented;

		if (message.isNullExpr()) {
			message = macro "";
		}
		message = Macroses.formatString(message);

		final position: Position = Context.currentPos();
		final formattedPosition: String = getShortPosition(Macroses.formatPos(position));
		
		final throwExpr = macro throw @:privateAccess banan.error.Error.e($typeCode, $v{formattedPosition}, $message, $scope);
		return Macroses.setPos(position, throwExpr);
	}

	public static macro function throwUnreachable(?message: ExprOf<String>, ?scope: ExprOf<Dynamic>): Expr {
#if display
		return macro null;
#end
		final typeCode = macro banan.error.ErrorType.unreachable;

		if (message.isNullExpr()) {
			message = macro "";
		}
		message = Macroses.formatString(message);

		final position: Position = Context.currentPos();
		final formattedPosition: String = getShortPosition(Macroses.formatPos(position));

		final throwExpr = macro throw @:privateAccess banan.error.Error.e($typeCode, $v{formattedPosition}, $message, $scope);
		return Macroses.setPos(position, throwExpr);
	}

#if !macro
	public static inline function getPositionDescr(posInfos: PosInfos): String {
		return getShortPosition('${posInfos.fileName}:${posInfos.lineNumber}:');
	}
#end
	
	/**
	 * **For internal purposes only.**  
	 * Escapes params and provides an error stack.
	 */
#if !macro
	private static function e(typeCode: Int, position: String, 
							?message: String = "", ?scope: Dynamic, ?stack: Array<StackItem>): Error {
	
		if (stack == null) {
			stack = getCallStack();
		}
		
		if (scope == null) {
			scope = {};
		}
		
		return new Error(typeCode, position, message, scope, stack);
	}
#end

	@:extern private static inline function getCallStack(): Array<StackItem> {
		return CallStack.callStack().slice(1); 
	}

	@:extern private static inline function getExceptionStack(): Array<StackItem> {
		return CallStack.exceptionStack();
	}

	/**
	 * Cut class name and pos from full path:
	 * `c:\project\taonga-haxe\src/game/quest/Quest.hx:60:10-49` => `Quest.hx:60`
	 */
	private static function getShortPosition(longPostion: String): String {
		
		var firstIdx: Int = longPostion.lastIndexOf('/') + 1;
		var lastIdx: Int = longPostion.lastIndexOf(':');
		
		return longPostion.substring(firstIdx, lastIdx);
	}
	
	public final typeCode: Int;
	public final position: String;
	public final message: String;
	public final scope: Dynamic;
	public final stack: Array<StackItem>;
	public var typeStr(get, null): String;
	
	private function new(typeCode: Int,
						position: String, 
						message: String, 
						scope: Dynamic, 
						stack: Array<StackItem>) {
		
		this.typeCode = typeCode;
		this.position = position;
		this.message = message;
		this.scope = scope;
		this.stack = stack;
	}
	
	public function clone(typeCode: Null<Int> = null): Error {
		return new Error(typeCode.or(this.typeCode), position, message, scope, stack);
	}
	
	public function toString(): String {
		return toStringExt('ERROR');
	}
	
	public function toStringExt(caption: String): String {
		
		final captionLen: Int = 73;
		final captionLPad: Int = M.idiv(captionLen + caption.length + 4, 2);
		
		return 
			'\n\n'
			+ '  $caption  '.lpad('#', captionLPad).rpad('#', captionLen) + '\n'
			+ 'type: ${typeStr}\n'
			+ 'position: ${Std.string(position)}\n'
			+ 'message: ${Std.string(message)}\n'
			+ 'scope: ${Std.string(scope)}\n'
			+ 'stack:'
			+ '${CallStack.toString(stack)}\n'
			+ '#########################################################################'
			+ '\n\n';
	}

	public inline function get_typeStr(): String {
		#if !macro 
		return banan.error.ErrorType.formattedBreadcrumbs(typeCode);
		#else
		return "";
		#end
	} 
}