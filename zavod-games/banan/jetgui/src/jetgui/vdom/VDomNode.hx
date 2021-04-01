package jetgui.vdom;
import jetgui.style.StyleRule;

@:enum abstract EVDomType(String) {
	
	var EElement = 'element';
	var EComponent = 'component';
}

class VDomNode {

	public var vDomId(default, null): VDomId;
	public var vDomType(default, null): EVDomType;
	public var vDomKey: Null<Any>;
	public var tag: Null<String>;
	public var styleRules: Null<Array<StyleRule>>;

	private function new(vDomId: VDomId, vDomType: EVDomType) {
		this.vDomId = vDomId;
		this.vDomType = vDomType;
	}
	
	public function asElement(): VDomElement {
		throw 'not an element';
	}
	
	public function asComponent(): VDomComponent {
		throw 'not a component';
	}
}