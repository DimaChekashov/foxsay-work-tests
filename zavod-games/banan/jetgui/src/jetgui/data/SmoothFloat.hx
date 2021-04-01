package jetgui.data;

import banan.animation.easing.Easing;

class SmoothFloat extends Value<Float> {
	
	private var smoothTypeInc: ESmoothType;
	private var parameterInc: Float;
	
	private var smoothTypeDec: ESmoothType;
	private var parameterDec: Float;
	
	private var smoothedValue: Null<Float>;
	private var from: Null<Float>; // is not null when animating, is null when not animating
	private var to: Null<Float>;
	private var startTime: Float;
	
	public function new(smoothTypeInc: ESmoothType, parameterInc: Float, smoothTypeDec: Null<ESmoothType>, parameterDec: Null<Float>): Void {
		
		super();
		
		this.smoothTypeInc = smoothTypeInc;
		this.parameterInc = parameterInc;
		
		this.smoothTypeDec = (smoothTypeDec != null) ? smoothTypeDec : smoothTypeInc;
		this.parameterDec = (parameterDec != null) ? parameterDec : parameterInc;
	}
	
	override public function get(): Null<Float> {
		
		validate();
		notifyValueAccessed();
		return smoothedValue;
	}
	
	public function getTarget(): Null<Float> {
		return super.get();
	}
	
	override private function setValue(newValue: Null<Float>): Void {
		
		if (value != newValue) {
			
			super.setValue(newValue);
			
			if (value == null) {
				from = to = smoothedValue = null;
			}
			else if (smoothedValue == null) {
				
				smoothedValue = value;
				from = to = null;
			}
			else {
				
				from = smoothedValue;
				to = value;
			}
			
			startTime = Observable.getTime();
			
			if (from != null) {
				invalidate();
			}
		}
	}
	
	override public function validate():Void {
		
		super.validate();
		
		if (from != null) {
			
			var isDone: Bool = updateSmooth(Observable.getTime());
			invalidate();
			
			if (isDone) {
				
				from = null;
				to = null;
			}
		}
	}
	
	private function updateSmooth(time: Float): Bool {
		
		var deltaTime: Float = time - startTime;
		
		var smoothType: ESmoothType = smoothTypeInc;
		var parameter: Float = parameterInc;
		
		if (to - from < 0.0) {
			
			smoothType = smoothTypeDec;
			parameter = parameterDec;
		}
		
		return switch(smoothType) {
			
			case Proportional:
				proportionalSmooth(deltaTime, parameter);
				
			case Linear:
				easingSmooth(deltaTime, Easing.linear, parameter);
			
			case QuarticIn:
				easingSmooth(deltaTime, Easing.quarticIn, parameter);
				
			case QuarticOut:
				easingSmooth(deltaTime, Easing.quarticOut, parameter);
				
			case QuarticInOut:
				easingSmooth(deltaTime, Easing.quarticInOut, parameter);
				
			case QuadraticIn:
				easingSmooth(deltaTime, Easing.quadraticIn, parameter);
				
			case QuadraticOut:
				easingSmooth(deltaTime, Easing.quadraticOut, parameter);
				
			case QuadraticInOut:
				easingSmooth(deltaTime, Easing.quadraticInOut, parameter);
		}
	}
	
	private function proportionalSmooth(deltaTime: Float, parameter: Float): Bool {
		
		/*
			x(t) - значение
			t - время
			k - коэффициент от 0 до 1
			v - целевое значение
			
			мы хотим чтобы x(t) приближалось к целевому значению со скоростью пропорциональной расстоянию от x до v
			dx(t)/dt = k * (v - x(t))
			
			ВольфрамАльфа дает такое решение этого уравнения:
			x(t) = C * e^(-k * t) + v
			
			Найдём констнату:
			x(0) = C * e^(-k * 0) + v 
			x(0) = C + v
			C = x(0) - v
			
			Результат:
			x(t) = (x(0) - v) * e^(-k * t) + v
		*/
			
		var factor: Float = parameter;
		smoothedValue = (from - to) * Math.exp( -factor * deltaTime) + to;
		
		if (Math.abs(smoothedValue - to) > 1e-5) {
			return false;
		}
		else {
			
			smoothedValue = to;
			return true;
		}
	}
	
	private function easingSmooth(deltaTime: Float, easingFn: Float->Float, parameter: Float): Bool {
		
		var duration: Float = parameter;
		
		if (deltaTime < duration) {
			
			smoothedValue = from + (to - from) * easingFn(deltaTime / duration);
			return false;
		}
		else {
			
			smoothedValue = to;
			return true;
		}
	}
}