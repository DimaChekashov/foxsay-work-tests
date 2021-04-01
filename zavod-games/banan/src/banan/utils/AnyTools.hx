package banan.utils;

import haxe.Constraints.IMap;
import haxe.ds.ObjectMap;

class AnyTools {

	public static inline function toBool(value: Any): Bool {
		
		var dynValue: Dynamic = value;
		
		return if (Std.is(dynValue, Bool)) (dynValue: Bool);
			else if (Std.is(dynValue, Int)) (dynValue: Int) != 0;
			else if (Std.is(dynValue, Float)) (dynValue: Float) != 0;
			else if	(Std.is(dynValue, String)) (dynValue: String) != '';
			else dynValue != null;		
	}
	
	public static inline function toNull<T>(value: T): Null<T> {
		return toBool(value) ? value : null;
	}
	
	public static inline function toFloat(value: Any, defValue: Float = 0.0): Float {
		
		return if (Std.is(value, Float)) {
			cast value;
		}
		else if (Std.is(value, String)) {
			
			var v: Float = Std.parseFloat(cast value);
			if (Math.isNaN(v)) {
				v = defValue;
			}
			v;
		}
		else {
			defValue;
		}
	}
	
	public static inline function toInt(value: Any, defValue: Int = 0): Int {
		
		return if (Std.is(value, Int)) {
			cast value;
		}
		else if (Std.is(value, String)) {
			
			var v: Null<Int> = Std.parseInt(cast value);
			if (v == null) {
				v = defValue;
			}
			v;
		}
		else {
			defValue;
		}
	}
	
	public static function convertToHash(value: Any, keyType: Any, valueType: Any, defaultValue: Any): Null<IMap<Dynamic, Dynamic>> {
		
		var result: Null<IMap<Dynamic, Dynamic>> = 
			if (Std.is(value, IMap)) {
				
				var hash: IMap<Dynamic, Dynamic> = cast value;
				
				for (key in hash.keys()) {
					
					if (!Std.is(key, keyType) || !Std.is(hash.get(key), valueType)) {
						return null;
					}
				}
				
				hash;
			}
			else if (Std.is(value, Array)) {
				
				var array: Array<Any> = cast value;
				var map: ObjectMap<Dynamic, Dynamic> = new ObjectMap();
				
				for (item in array) {
					
					if (!Std.is(item, keyType)) {
						return null;
					}
					
					map.set(item, defaultValue);
				}
				
				map;
			}
			else if (Std.is(value, keyType)) {
				
				var map: ObjectMap<Dynamic, Dynamic> = new ObjectMap();
				map.set(value, defaultValue);
				map;
			}
			else {
				null;
			}
		
		return result;
	}
}