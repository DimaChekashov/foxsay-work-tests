package banan.math;

import banan.backend.BFloat;

class Vector2 {
	
	@:extern public static inline function fromXY(x: BFloat, y: BFloat): Vector2 {
		return new Vector2(x, y);
	}
	
	@:extern public static inline function fromPoint(p: Point): Vector2 {
		return new Vector2(p.x, p.y);
	}
	
	@:extern public static inline function fromIntPoint(p: IntPoint): Vector2 {
		return new Vector2(p.x, p.y);
	}
	
	@:extern public static inline function fromPolar(length: BFloat, angle: BFloat): Vector2 {
		return new Vector2(length * M.cos(angle), length * M.sin(angle));
	}
	
	@:extern public static inline function fromNaN(): Vector2 {
		return new Vector2(Math.NaN, Math.NaN);
	}
	
	public var x(default, null): BFloat;
	public var y(default, null): BFloat;
	
	public var lengthSquared(get, never): BFloat;
	@:extern inline function get_lengthSquared():BFloat return x * x + y * y;

	public var length(get, never): BFloat;
	@:extern inline function get_length():BFloat return M.sqrt(lengthSquared);

	public var angle(get, never): BFloat;
	@:extern inline function get_angle(): BFloat return M.atan2(y, x);
	
	@:extern inline function new(x: BFloat, y: BFloat) {
		this.x = x;
		this.y = y;
	}
	
	public inline function toString(): String {
		return '{x:$x, y:$y}';
	}
	
	@:extern inline public function toIntPoint(): IntPoint {
		return new IntPoint(Math.floor(x), Math.floor(y));
	}

	@:extern inline public function toPoint(): Point {
		return new Point(x, y);
	}
	
	@:extern inline public function vector3(z: BFloat): Vector3 {
		return Vector3.fromXYZ(x, y, z);
	}
	
#if kha
	@:extern inline public function fastVector4(isPoint: Bool): kha.math.FastVector4 {
		return new kha.math.FastVector4(x, y, 0.0, isPoint ? 1.0 : 0.0);
	}
#end
	
	@:extern public inline function linearBezier(to: Vector2, t: Float): Vector2 {
		return this.multiply(1 - t).add(to.multiply(t));
	}
	
	@:extern inline public function mirror(o: Vector2): Vector2 {
		return o.add(o.substract(this));
	}
	
	@:extern inline public function add(rhs: Vector2): Vector2 {
		return new Vector2(x + rhs.x, y + rhs.y);
	}
	
	@:extern inline public function substract(rhs: Vector2): Vector2 {
		return new Vector2(x - rhs.x, y - rhs.y);
	}
	
	@:extern inline public function componentDivide(rhs: Vector2): Vector2 {
		return new Vector2(x / rhs.x, y / rhs.y);
	}
	
	@:extern inline public function componentMultiply(rhs: Vector2): Vector2 {
		return new Vector2(x * rhs.x, y * rhs.y);
	}
	
	@:extern inline public function equals(rhs: Vector2): Bool {
		return x == rhs.x && y == rhs.y;
	}
	
	@:extern inline public function multiply(value: BFloat): Vector2 {
		return new Vector2(x * value, y * value);
	}
	
	@:extern inline public function dot(rhs: Vector2): BFloat {
		return x * rhs.x + y * rhs.y;
	}
	
	@:extern inline public function componentMin(): BFloat {
		return x < y ? x : y;
	}
	
	@:extern inline public function perp(): Vector2 {
		return new Vector2(y, -x);
	}
	
	@:extern inline public function normalize(): Vector2 {
		var l: BFloat = length;
		return new Vector2(x / l, y / l);
	};
	
	@:extern inline public function setFrom(v: Vector2):Void {
		this.x = v.x;
		this.y = v.y;
	}
	
	@:extern inline public function setX(x: BFloat): Void {
		this.x = x;
	}
	
	@:extern inline public function setY(y: BFloat): Void {
		this.y = y;
	}
	
	@:extern inline public function applyToComponents(fn: (v: BFloat) -> BFloat): Vector2 {
		return new Vector2(fn(x), fn(y));
	}
}