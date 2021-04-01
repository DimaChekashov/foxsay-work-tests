package jetgui.style;

enum ESizeImpl {
	
	px(value: Float); 
	percent(value: Null<Float>); 
	content;
	contentScaled(scale: Float);
	auto;
}

@:forwardStatics
abstract ESize(ESizeImpl) from ESizeImpl to ESizeImpl {
	
	@:from public static function fromPx(value: Float): ESize {
		return px(value);
	}
	
	@:op(A == B)
	private inline function isEqual(rhs: ESize): Bool {
		
		var rhsImpl: ESizeImpl = rhs;
		return (this != null && rhsImpl != null && this.equals(rhsImpl)) || (this == null && rhsImpl == null);
	}
	
	@:op(A != B)
	private inline function isNotEqual(rhs: ESize): Bool {
		return !isEqual(rhs);
	}
}