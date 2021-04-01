package jetgui;

@:enum abstract Axis(Int) {

	var X = 0;
	var Y = 1;
	
	public var cross(get, never): Axis;
	
	public inline function select<T>(xVal: T, yVal: T): T {
		return (cast this: Axis) == X ? xVal : yVal;
	}
	
	public inline function toString(): String {
		return select('X', 'Y');
	}
	
	private inline function get_cross(): Axis {
        return select(Y, X);
    }
}