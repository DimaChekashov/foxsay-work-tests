package jetgui.data;

import banan.error.Error;
import banan.math.M;

private class SliderDataIterator<T> {
	
	private var data: JetArray<T>;
	private var firstVisiblePercent: Float;
	private var lastVisiblePercent: Float;
	private var i: Int;
	
	public inline function new(data: JetArray<T>, firstVisiblePercent: Float, lastVisiblePercent: Float) {
		
		this.data = data;
		this.firstVisiblePercent = firstVisiblePercent;
		this.lastVisiblePercent = lastVisiblePercent;
		this.i = 0;
	}
	
	public inline function hasNext() : Bool {
		return i < data.length;
	}

	public inline function next() : {key: T, value: Float} {
		
		var visiblePercent: Float = 1;
		if (i == 0) {
			visiblePercent -= 1 - firstVisiblePercent;
		}
		if (i == data.length - 1) {
			visiblePercent -= 1 - lastVisiblePercent;
		}
		
		return { key: data[i++], value: visiblePercent }
	}
}

typedef TGotoTask = {
	index: Int, // index of element
	align: Float, // where to position element, 0 - left, 1 - right, 0.5 - center
	isAnimated: Bool
}

class JetSliderBase<T> {

	public var data: JetArray<T> = new JetArray<T>();
	
	// set by slider element, in elements, so if you want to elements 1 to 3, then pass 1 and 4
	public var visibleFrom(default, null): Float;
	public var visibleTo(default, null): Float;
	
	// how much to displace elements before drawing, in element sizes
	public var drawOffset(default, null): Float = 0;
	
	public var firstVisiblePercent(get, never): Float;
	private var firstVisiblePercentValue: Value<Float> = new Value<Float>(0);
	private inline function get_firstVisiblePercent(): Float {
		return firstVisiblePercentValue.get();
	}
	
	public var lastVisiblePercent(get, never): Float;
	private var lastVisiblePercentValue: Value<Float> = new Value<Float>(0);
	private inline function get_lastVisiblePercent(): Float {
		return lastVisiblePercentValue.get();
	}
	
	private var iFrom: Int = -1;
	private var iTo: Int = -1;
	@:allow(jetgui.element.slider.SliderElement)
	private var gotoTask: Null<TGotoTask> = null;
	
	public function new() {
		
	}
	
	public function getStartIndex(): Int {
		return drawOffset < 0 ? iFrom + 1 : iFrom;
	}
	
	public function goto(index: Int, align: Float = 0.0, isAnimated: Bool = false): Void {
		
		gotoTask = 
			{
				index: index,
				align: align,
				isAnimated: isAnimated
			};
	}
	
	@:allow(jetgui.element.slider.SliderElement)
	private function setVisiblePart(from: Float, to: Float): Void {
		
		this.visibleFrom = from;
		this.visibleTo = to;
		
		var count: Int = getCount();
		var iFrom: Int = M.max(Math.floor(from), 0);
		var iTo: Int = M.min(Math.ceil(to), count);
		
		if (this.iFrom != iFrom || this.iTo != iTo) {
			
			this.iFrom= iFrom;
			this.iTo = iTo;
			
			sync();
		}
		
		drawOffset = iFrom - from;
		firstVisiblePercentValue.set(M.roundFixed( M.min(iFrom + 1 - from, 1), 2));
		lastVisiblePercentValue.set(M.roundFixed( M.min(to - iTo + 1, 1), 2));
	}
	
	public function sync(): Void {
		
		var i: Int = 0;
		
		var count: Int = getCount();
		if (iTo > count) {
			iTo = count;
		}
		
		if (iTo > iFrom) {
			
			for (j in iFrom...iTo) {
				syncImpl(j, i++);
			}
		}
		
		data.resize(i);
	}
	
	public function getCount(): Int {
		Error.throwNotImplemented();
	}
	
	private function syncImpl(idxFrom: Int, idxTo: Int): Void {
		Error.throwNotImplemented();
	}
	
	// iterates over pairs element=>visiblePercent
	public inline function keyValueIterator(): SliderDataIterator<T> {
		return new SliderDataIterator<T>(data, firstVisiblePercent, lastVisiblePercent);
	}
}