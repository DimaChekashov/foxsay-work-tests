package banan.math;

import banan.backend.BFloat;

class M {

	public static inline var PI: BFloat = 3.141592653589793;
	public static inline var PI2: BFloat = 2 * PI;
	public static inline var MAX_INT: Int = 2147483647;
	public static inline var MIN_INT: Int = -2147483648;
	
	@:generic
	public static inline function clamp<T:Float>(value:T, min:T, max:T):T {
		return value < min ? min : (value > max ? max : value);
	}
	
	@:generic 
	public static inline function min<T:Float>(a:T, b:T):T {
		return a < b ? a : b;
	}

	@:generic 
	public static inline function max<T:Float>(a:T, b:T):T {
		return a > b ? a : b;
	}
	
	@:generic 
	public static inline function abs<T:Float>(a:T):T {
		return a >= 0 ? a : -a;
	}
	
	public static inline function sign<T:Float>(a:T): Int {
		return a > 0 ? 1 : (a < 0 ? -1 : 0);
	}
	
	public static inline function distance2(x0:BFloat, y0:BFloat, x1:BFloat, y1:BFloat):BFloat {
		
		var dx = x1 - x0;
		var dy = y1 - y0;
		return dx * dx + dy * dy;
	}
	
	public static inline function distance(x0:BFloat, y0:BFloat, x1:BFloat, y1:BFloat):BFloat {
		return sqrt(distance2(x0, y0, x1, y1));
	}
	
	public static inline function randomF(from: Float, to: Float): Float {
		return from + Math.random() * (to - from);
	}
	
	/**
	 * returns random number in range from `from` to `to` inclusive
	 **/
	public static function randomI(from: Int, to: Int): Int {
		
		var interval: Int = (to - from) + 1;
		return from + Math.floor(Math.random() * interval);
	}
	
	public static inline function degToRad(deg: Float): Float {
		return deg * (Math.PI / 180.0);
	}
	
	public static inline function radToDeg(rad: Float): Float {
		return rad * (180.0 / Math.PI);
	}
	
	public static inline function sin(a:BFloat) {
		return Math.sin(a);
	}
	
	public static inline function cos(a:BFloat) {
		return Math.cos(a);
	}
	
	public static inline function sqrt(x:BFloat) {
		return Math.sqrt(x);
	}

	public static inline function atan2(y:BFloat, x:BFloat) {
		return Math.atan2(y, x);
	}
	
	public static inline function idiv(x: Int, y: Int): Int {
		
		#if sys
			return cpp.NativeMath.idiv(x, y);
		#else
			return Std.int(x / y);
		#end
	}
	
	public static inline function imod(x: Int, y: Int): Int {
		
		#if sys
			return cpp.NativeMath.imod(x, y);
		#else
			return x % y;
		#end
	}
	
	public static inline function roundFixed(f: Float, prec: Int): Float {
		
		var t: Float = Math.pow(10, prec);
		return Math.round(f * t) / t;
	}
	
	public static inline function isInside(x: Float, y: Float, left: Float, top: Float, right: Float, bottom: Float): Bool {
		
		return
			x >= left
			&& y >= top
			&& x < right
			&& y < bottom;
	}
	
	public static inline function getBarycentric(a: Float, b: Float, p: Float): Float {
		return (1 - p) * a + p * b;
	}
	
	public static inline function isAlmostEqual(a: Float, b: Float): Bool {
		
		var d = a - b;
		var eps = 1e-10;
		return d >= 0 ? d < eps : d > -eps;
		
	}
	
	public static inline function isBetween<T:Float>(x: T, min: T, max: T): Bool {
		return x >= min && x <= max;
	}
	
	public static inline function ceil<T: Null<Float>>(x: T):Null<Int> {
		return x == null? null : Math.ceil(x);
	}
	
	/**
		Compares float `a` and `b`. If `a` is less than `b`, the result is `-1`. If `b` is less than
		`a`, the result is `1`. If `a` and `b` are equal, the result is `0`.
	**/
	public static inline function compare<T:Float>(a: T, b: T): Int {
		return a > b ? 1 : a < b ? -1 : 0;
	}
	
	public static inline function isEven(a: Int): Bool {
		return ((a >> 1) << 1) == a;
	}
}