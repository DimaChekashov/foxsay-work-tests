package banan.math;

class IntPoint {
	
	public static function fromPoint(point: Point): IntPoint {
		return new IntPoint(Math.floor(point.x), Math.floor(point.y));
	}
	
	public static function zero(): IntPoint {
		return new IntPoint(0, 0);
	}
	
	public var x: Int;
	public var y: Int;
	
	public function new(x: Int, y: Int) {
		
		this.x = x;
		this.y = y;
	}
	
	public function offsetFloor(x: Float, y: Float) {
		
		this.x += Math.floor(x);
		this.y += Math.floor(y);
	}
}