package banan.ds;

@:forward(join, iterator, filter, indexOf, map, copy, concat)
abstract ConstArray<T>(Array<T>) from Array<T> to Iterable<T> {
	
    public var length(get,never): Int;
	private inline function get_length(): Int {
		return this.length;
	}
	
    @:arrayAccess
	inline function get(no: Int): T {
		return this[no];
	}
	
	public inline function __getMutable(): Array<T> {
		return this;
	}
}