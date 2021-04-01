package jetgui.style;

typedef TAnimConfig={
	
	var keyOrId: Any;
	
	@:optional var loopCount: Int;
	@:optional var shiftTime: Float; //time to start from
	@:optional var ignoreOffsets: Bool;
	@:optional var isPaused: Bool;
	
	@:optional var alias: String;
	@:optional var startCb: (alias: String)->Void;
	@:optional var endCb: (alias: String)->Void;
}