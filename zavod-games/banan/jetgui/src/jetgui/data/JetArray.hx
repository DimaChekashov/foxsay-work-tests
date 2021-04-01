package jetgui.data;

import banan.ds.ConstArray;

@:forward(length, push, pop, unshift, shift, remove, indexOf, resize, sort, iterator, toString)
abstract JetArray<T>(ArrayObservable<T>) from ArrayObservable<T> to Iterable<T> {

	inline public function new() {
		this = new ArrayObservable(null);
	}
	
	@:from public static function fromArray<T>(array: Array<T>): JetArray<T> {
		return new ArrayObservable<T>(array);
	}

	@:from public static function fromConstArray<T>(array: ConstArray<T>): JetArray<T> {
		return new ArrayObservable<T>(array.__getMutable());
	}

	@:arrayAccess public inline function read(idx: Int): Null<T> {
		return this.read(idx);
	}

	@:arrayAccess public inline function write(idx: Int, value: T): T {
		return this.write(idx, value);
	}
}

private class ArrayObservable<T> extends Observable {
	
	public var length(get, never): Int;
	
	private var array: Array<T>;
	
	private inline function get_length(): Int {
		
		notifyValueAccessed();
		return array.length;
	}
	
	public function new(?array: Array<T>) {

		this.array = array != null ? array.copy() : [];
		notifyValueChanged();
	}
	
	public function read(idx: Int): Null<T> {

		notifyValueAccessed();
		return (idx >= 0 && idx < length) ? array[idx] : null;
	}

	public function write(idx: Int, value: T): T {
		
		if(array[idx] != value || idx >= array.length) {
			
			array[idx] = value;
			notifyValueChanged();
		}
		
		return value;
	}
	
	public function push(value: T): Int {
		
		var newLength: Int = array.push(value);
		notifyValueChanged();
		
		return newLength;
	}
	
	public function pop(): Null<T> {
		
		var length: Int = array.length;
		var value: Null<T> = array.pop();
		
		if(length > 0) {
			notifyValueChanged();
		}
		
		return value;
	}
	
	public function unshift(value: T): Void {
		
		array.unshift(value);
		notifyValueChanged();
	}
	
	public function shift(): Null<T> {
		
		var length: Int = array.length;
		var value: Null<T> = array.shift();
		
		if(length > 0) {
			notifyValueChanged();
		}
		
		return value;
	}
	
	public function remove(value: T): Bool {
		
		return
			if (array.remove(value)) {
				
				notifyValueChanged();
				true;
			}
			else {
				false;
			}
	}
	
	public function indexOf(value: T): Int {
		
		notifyValueAccessed();
		return array.indexOf(value);
	}
	
	public function resize(length: Int): Void {
		
		if(length != array.length) {
			
			array.resize(length);
			notifyValueChanged();
		}
	}
	
	public function sort(f: (a: T, b: T) -> Int): Void {
		
		array.sort(f);
		notifyValueChanged();
	}
	
	public function iterator(): Iterator<T> {
		
		notifyValueAccessed();
		return array.iterator();
	}
	
	public function toString(): String {
		return '[\n\t' + array.join(',\n\t') + '\n]';
	}
}