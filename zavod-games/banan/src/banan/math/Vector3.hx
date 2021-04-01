package banan.math;

import banan.backend.BFloat;
import banan.math.Vector2;

class Vector3{

	public var x(default, null):BFloat;
	public var y(default, null):BFloat;
	public var z(default, null):BFloat;
	
	public var vector2(get, never):Vector2;
	@:extern inline function get_vector2():Vector2 return Vector2.fromXY(x, y);
	
	@:extern inline function new(X:BFloat, Y:BFloat, Z:BFloat) {
		x = X;
		y = Y;
		z = Z;
	}
	
	public inline function toString():String return '{x:$x, y:$y, z:$z}';
	
	@:extern public static inline function fromXYZ(x:BFloat, y:BFloat, z:BFloat):Vector3 return new Vector3(x, y, z);
	
	public var lengthSquared(get, never):BFloat;
	@:extern inline function get_lengthSquared():BFloat return x * x + y * y + z * z;

	public var length(get, never):BFloat;
	@:extern inline function get_length():BFloat return M.sqrt(lengthSquared);
	
	@:extern public inline function add(rhs:Vector3):Vector3 return new Vector3(x + rhs.x, y + rhs.y, z + rhs.z);
	
	@:extern public inline function substract(rhs:Vector3):Vector3 return new Vector3(x - rhs.x, y - rhs.y, z - rhs.z);
	 
	@:extern public inline function dotProduct(rhs:Vector3):BFloat return x * rhs.x + y * rhs.y + z * rhs.z;
	
}