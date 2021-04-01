package banan.animation.easing;

import banan.math.Bezier;
import banan.math.M;
import banan.math.Point;

class PowerEasingFunction {
	
	public static function easeIn(v: Float, power: Float): Float {
		return Math.pow(v, power);
	}
	
	public static function easeOut(v: Float, power: Float): Float {
		return 1 - Math.pow(1 - v, power);
	}
	
	public static function easeInOut(v: Float, power: Float): Float {
		
		return 
			if(v < 0.5) {
				Math.pow(v * 2, power) * 0.5;
			}
			else {
				1 - Math.pow((1 - v) * 2, power) * 0.5;
			}
	}
}

class CubicBezierEasingFunction {
	
	private var bezier: Bezier;
	
	public function new(s: Point, f: Point, p1: Point, p2: Point) {
		this.bezier = new Bezier(s, f, p1, p2);
	}
	
	public function easingFunction(t: Float): Float {
		return bezier.getAt(t).y;
	}
}

class Easing {
	
	public static function linear(v: Float): Float {
		return v;
	}
	
	public static var quadraticIn: Float->Float = PowerEasingFunction.easeIn.bind(_, 2);
	public static var quadraticOut: Float->Float = PowerEasingFunction.easeOut.bind(_, 2);
	public static var quadraticInOut: Float->Float = PowerEasingFunction.easeInOut.bind(_, 2);
	public static var quarticIn: Float->Float = PowerEasingFunction.easeIn.bind(_, 4);
	public static var quarticOut: Float->Float = PowerEasingFunction.easeOut.bind(_, 4);
	public static var quarticInOut: Float->Float = PowerEasingFunction.easeInOut.bind(_, 4);
	public static var quinticIn: Float->Float = PowerEasingFunction.easeIn.bind(_, 5);

	public var from(default, null): Float;
	public var to(default, null): Float;
	public var duration(default, null): Float;
	public var time(default, null): Float;
	
	private var change: Float;
	
	private var easeFunction: Float->Float;
	
	public function new(from: Float, to: Float, duration: Float, easeFunction: Float->Float) {
		
		this.from = from;
		this.to = to;
		this.change = this.to - this.from;
		
		time = 0.0;
		this.duration = duration;
		this.easeFunction = easeFunction;
		
		if (M.isAlmostEqual(duration, 0)) {
			this.duration = 1.0;
			this.time = 1.0;
		}
	}
	
	public function getValue(dt: Float): Float {
		
		time += dt;
		
		if (time > duration) {
			time = duration;
		}
		
		return change * easeFunction(time / duration) + from;
	}
	
	public function isCompleted(): Bool {
		return (time >= duration);
	}
}

class Linear extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.linear);
	}
}

class QuadraticIn extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quadraticIn);
	}
}

class QuadraticOut extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quadraticOut);
	}
}

class QuadraticInOut extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quadraticInOut);
	}
}

class QuarticIn extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quarticIn);
	}
}

class QuarticOut extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quarticOut);
	}
}

class QuinticIn extends Easing {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, Easing.quinticIn);
	}
}

class InBack extends CustomBezier {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, 0.36, 0.0, 0.66, -0.56);
	}
}

class OutBack extends CustomBezier {
	
	public function new(from: Float, to: Float, duration: Float): Void {
		super(from, to, duration, 0.34, 1.56, 0.64, 1.0);
	}
}

class CustomBezier extends Easing {
	
	public function new(from: Float, to: Float, duration: Float, p1x: Float, p1y: Float, p2x: Float, p2y: Float): Void {
		
		final func = new CubicBezierEasingFunction(
			new Point(0.0, 0.0), new Point(1.0, 1.0), new Point(p1x, p1y), new Point(p2x, p2y)
		);
		
		super(from, to, duration, func.easingFunction);
	}
}