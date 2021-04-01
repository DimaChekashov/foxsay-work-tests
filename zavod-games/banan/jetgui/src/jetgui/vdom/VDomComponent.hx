package jetgui.vdom;

import haxe.ds.Map;
import jetgui.JetContext;
import jetgui.vdom.VDomComponent;

class VDomComponent extends VDomNode {

	public var mountContent: Null < Map < String, ()->Array<VDomNode> >> ;
	public var ctx: JetContext;
	
	public function new(vDomId: VDomId) {
		super(vDomId, EComponent);
	}
	
	public function addMountContent(name: String, renderFn: ()->Array<VDomNode>): Void {
		
		if (mountContent == null) {
			mountContent = new Map();
		}
		
		mountContent[name] = renderFn;
	}
	
	public function renderMountContent(name: String): Null<Array<VDomNode>> {
		
		if (mountContent == null || !mountContent.exists(name)) {
			return null;
		}
		
		return mountContent[name]();
	}
	
	public function createComponent(): Component {
		throw 'not implemented';
	}
	
	public function copyFrom(t: VDomComponent): Void {
		throw 'not implemented';
	}
	
	override public function asComponent(): VDomComponent {
		return this;
	}
}