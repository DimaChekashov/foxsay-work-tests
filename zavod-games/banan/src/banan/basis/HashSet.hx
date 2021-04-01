package banan.basis;

using banan.basis.IteratorHelper;

abstract HashSet<T>(Map<T, Bool>) {

	@:generic
	public static function fromArray<T>(array: Array<T>): HashSet<T> {
		
		final hashSet: HashSet<T> = new HashSet();
		
		for (item in array) {
			hashSet.push(item);
		}
		
		return hashSet;
	}
	
	@:extern inline public function new() {
		this = new Map();
	}

    public inline function has(item: T): Bool {
        return this.exists(item);
    }

	public inline function push(item: T): Void {
		this.set(item, true);
	}

	public inline function remove(item: T): Bool {
		return this.remove(item);
	}

	public inline function iterator(): Iterator<T> {
		return this.keys();
	}

	@:to public inline function toIterable(): Iterable<T> {
		return cast this;
	}

	public inline function clear(): Void {
		this.clear();
	}

	public inline function isEmpty(): Bool {
		return !this.keys().hasNext();
	}
	
	public inline function asArray(): Array<T> {
		return this.keys().toArray();
	}
}