package jetgui;

import jetgui.vdom.VDomComponent;
import jetgui.vdom.VDomNode;

class Component {
	
	public var ctx: JetContext;

	public function render(vDom: VDomComponent): Null<Array<VDomNode>> {
		//override
		return null;
	}
	
	public function applyVDomAttributes(vDom: VDomComponent): Void {
		throw 'override applyVDomAttributes';
	}
	
	public function toString() : String {
		return Type.getClassName(Type.getClass(this));
	}
}