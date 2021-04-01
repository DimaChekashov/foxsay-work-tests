package banan.math;

class Bezier {
	
	@:extern private static inline function calculateLinear(s: Point, f: Point, t: Float): Vector2 {
		
		var not_t: Float = 1 - t;
		
		var x: Float = not_t * s.x + t * f.x;
		var y: Float = not_t * s.y + t * f.y;
		
		return Vector2.fromXY(x, y);
	}
	
	@:extern private static inline function calculateQuadratic(s: Point, f: Point, t: Float, p1: Point): Vector2 {
		
		var t2: Float = t * t;
		
		var not_t: Float = 1 - t;
		var not_t_2: Float = not_t * not_t;
		
		var x: Float = not_t_2 * s.x + 2 * not_t * t * p1.x + t2 * f.x;
		var y: Float = not_t_2 * s.y + 2 * not_t * t * p1.y + t2 * f.y;
		
		return Vector2.fromXY(x, y);
	}
	
	@:extern private static inline function calculateCubic(s: Point, f: Point, t: Float,
		p1: Point, p2: Point): Vector2 {
		
		var t2: Float = t * t;
		var t3: Float = t2 * t;
		
		var not_t: Float = 1 - t;
		var not_t_2: Float = not_t * not_t;
		var not_t_3: Float = not_t_2 * not_t;
		
		var x: Float = not_t_3 * s.x + 3 * not_t_2 * t * p1.x + 3 * not_t * t2 * p2.x + t3 * f.x;
		var y: Float = not_t_3 * s.y + 3 * not_t_2 * t * p1.y + 3 * not_t * t2 * p2.y + t3 * f.y;
		
		return Vector2.fromXY(x, y);
	}
	
	@:extern private static inline function calculateLinerDerivative(s: Point, f: Point): Vector2 {
		return Vector2.fromXY(f.x - s.x, f.y - s.y);
	}
	
	@:extern private static inline function calculateQuadraticDerivative(s: Point, f: Point, t: Float,
		p1: Point): Vector2 {
		
		inline function calculateComponent(s: Float, f: Float, t: Float, p1: Float): Float {
			
			return
				-2 * s * (1 - t)
				+ 2 * p1 * (- 2 * t + 1)
				+ 2 * f * t;
		}
		
		var x: Float = calculateComponent(s.x, f.x, t, p1.x);
		var y: Float = calculateComponent(s.y, f.y, t, p1.y);
		
		return Vector2.fromXY(x, y);
	}
	
	@:extern private static inline function calculateCubicDerivative(s: Point, f: Point, t: Float,
		p1: Point, p2: Point): Vector2 {
		
		inline function calculateComponent(s: Float, f: Float, t: Float, p1: Float, p2: Float): Float {
			
			return
				-3 * s * (1 - t) * (1 - t)
				+ 3 * p1 * (3 * t * t - 4 * t + 1)
				+ 3 * p2 * (-3 * t * t + 2 * t)
				+ 3 * f * t * t;
		}
		
		var x: Float = calculateComponent(s.x, f.x, t, p1.x, p2.x);
		var y: Float = calculateComponent(s.y, f.y, t, p1.y, p2.y);
			
		return Vector2.fromXY(x, y);
	}
	
	public var s(default, null): Point;
	public var f(default, null): Point;
	
	public var p1(default, null): Point;
	public var p2(default, null): Point;
	
	public function new(s: Point, f: Point, ?p1: Point, ?p2: Point) {
		
		this.s = s;
		this.f = f;
		
		this.p1 = p1;
		this.p2 = p2;
	}
	
	@:extern public inline function getAt(t: Float): Vector2 {
		
		var result: Vector2 = Vector2.fromNaN();
		switch ([p1, p2]) {
			
			case [null, null]:
				result.setFrom(calculateLinear(s, f, t));
				
			case [_, null]:
				result.setFrom(calculateQuadratic(s, f, t, p1));
				
			case [_, _]:
				result.setFrom(calculateCubic(s, f, t, p1, p2));
		}
		
		return result;
	}
	
	@:extern public inline function getDerivativeAt(t: Float): Vector2 {
		
		var result: Vector2 = Vector2.fromNaN();
		switch ([p1, p2]) {
			
			case [null, null]:
				result.setFrom(calculateLinerDerivative(s, f));
				
			case [_, null]:
				result.setFrom(calculateQuadraticDerivative(s, f, t, p1));
				
			case [_, _]:
				result.setFrom(calculateCubicDerivative(s, f, t, p1, p2));
		}
			
		return result;
	}
}