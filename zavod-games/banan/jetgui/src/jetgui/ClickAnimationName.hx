package jetgui;

abstract ClickAnimationName(Null<String>) from Null<String> to Null<String> {

	@:from public static inline function fromBool(v: Bool): ClickAnimationName {
		return v ? "default" : null;
	}
}