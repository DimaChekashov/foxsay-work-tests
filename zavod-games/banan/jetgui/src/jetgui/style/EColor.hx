package jetgui.style;

enum EColorImpl {
	
	white;
	red;
	green;
	yellow;
	blue;
	black;
	rgba(r: Int, g: Int, b: Int, a: Float);
	rgb(r: Float, g: Float, b: Float);
	hex(color: Int);
}

@:forwardStatics
abstract EColor(EColorImpl) from EColorImpl to EColorImpl {
	
	static var hexColorEReg: EReg = ~/^(?:0x|#)?([0-9a-fA-F]{6,8})$/;
	
	@:from public static inline function fromInt(i: Int): EColor {
		return hex(i);
	}
	
	@:from public static inline function fromString(s: Null<String>): Null<EColor> {
		
		var result: EColor = null;
		
		if (s != null) {
			
			for (color in Type.allEnums(EColorImpl)) {
				
				if (color.getName() == s) {
					
					result = color;
					break;
				}
			}
			
			if (result == null && hexColorEReg.match(s)) {
				
				var i: Int = Std.parseInt('0x' + hexColorEReg.matched(1));
				result = hex(i);
			}
			
			if (result == null) {
				trace('invalid color value: $s');
				result = red;
			}
		}
		
		return result;
	}
	
	public static function compare(a: Null<EColor>, b: Null<EColor>): Bool {
		
		return 
			if (a == null && b == null) {
				true;
			}
			else if (a != null && b != null) {
				a.equals(b);
			}
			else {
				false;
			}
	}
	
	// need this because https://github.com/HaxeFoundation/haxe/issues/7603
	// TODO remove when issue fixed
	public static inline function rgba(r: Int, g: Int, b: Int, a: Float): EColor {
		return EColorImpl.rgba(r, g, b, a);
	}

	public static inline function rgb(r: Float, g: Float, b: Float): EColor {
		return EColorImpl.rgb(r, g, b);
	}
}