package banan.math;

class Point {

	@:extern public static inline function fromVector2(v: Vector2): Point {
		return new Point(v.x, v.y);
	}
	
	@:extern public static inline function fromIntPoint(p: IntPoint): Point {
		return new Point(p.x, p.y);
	}
	
	public var x: Float;
	public var y: Float;
	
	public function new(x: Float = 0.0, y: Float = 0.0) {
		
		this.x = x;
		this.y = y;
	}
	
	public function add(p: Point): Point {
		
		this.x += p.x;
		this.y += p.y;
		
		return this;
	}
	
	public function setXy(x: Float, y: Float): Point {
		
		this.x = x;
		this.y = y;
		
		return this;
	}
	
	@:extern public inline function setVector2(v: Vector2): Void {
		
		this.x = v.x;
		this.y = v.y;
	}
	
	public function addXy(x: Float, y: Float): Point {
		
		this.x += x;
		this.y += y;
		
		return this;
	}
	
	public function clone(): Point {
		return new Point(x, y);
	}
	
	public function copy(from: Point): Point {
		
		this.x = from.x;
		this.y = from.y;
		
		return this;
	}
	
	public function equals(other: Point) {
		return this == other || (this.x == other.x) && (this.y == other.y);
	}

	public inline function distanceTo(other: Point): Float {
		return M.distance(x, y, other.x, other.y);
	}
}