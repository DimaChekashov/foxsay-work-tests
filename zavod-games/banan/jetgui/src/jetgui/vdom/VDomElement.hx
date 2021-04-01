package jetgui.vdom;

import banan.math.M;
import jetgui.data.JetSliderBase;
import jetgui.style.Style;
import jetgui.style.StyleMacro;
import jetgui.vdom.VDomNode;

using banan.basis.NullHelper;

typedef TTooltipConfig = {
	var interactType: String;
	var animationType: String;
	var tooltip: VDomNode;
	var hAlign: Float;
	var vAlign: Float;
	var hideDistanceX: Int;
	var hideDistanceY: Int;
}

enum EMaskedScaleMode {
	exact;
	cover;
}

@:build(jetgui.style.StyleMacro.addStyleFields())
class VDomElement extends VDomNode {

	public var children: Array<VDomNode> = [];
	public var tooltipList: Array<TTooltipConfig> = [];
	
	public var id: Null<String>;
	public var classList: Null<String>;
	public var style: Style = {};
	public var elementRef: Null<String>;
	public var data: Null<String>;
	public var writeWidth: Null < (width: Int)->Void >;
	public var writeHeight: Null < (height: Int)->Void >;
	public var writeIsTouched: Null < (isTouched: Bool)->Void >;
	public var sliderData: Null<JetSliderBase<Dynamic>>;	
	public var onDragStart: Null<(x: Float, y: Float)->Void>;
	public var onDrag: Null<(x: Float, y: Float)->Void>;
	public var onDragEnd: Null<(x: Float, y: Float)->Void>;
	public var clickAnimation: Null<ClickAnimationName>;
	
	//clipping mask attrs
	public var srcMask: jetgui.JetAssetPath;
	public var maskedScale: Null<Float>;
	public var maskedScaleX: Null<Float>;
	public var maskedScaleY: Null<Float>;
	public var maskedSize: Null<Int>;
	public var maskedSizeX: Null<Int>;
	public var maskedSizeY: Null<Int>;
	public var maskedShift: Null<Int>;
	public var maskedShiftX: Null<Int>;
	public var maskedShiftY: Null<Int>;
	public var maskedAlign: Null<Float>;
	public var maskedAlignX: Null<Float>;
	public var maskedAlignY: Null<Float>;
	public var maskedScaleMode: Null<EMaskedScaleMode>;
	
	//all Style fields are duplicated in this class by macro

	public var left(get, set): Null<Int>;
	inline function get_left() return offsetLeft;
	inline function set_left(v) return offsetLeft = v;

	public var right(get, set): Null<Int>;
	inline function get_right() return offsetRight;
	inline function set_right(v) return offsetRight = v;

	public var top(get, set): Null<Int>;
	inline function get_top() return offsetTop;
	inline function set_top(v) return offsetTop = v;
	
	public var bottom(get, set): Null<Int>;
	inline function get_bottom() return offsetBottom;
	inline function set_bottom(v) return offsetBottom = v;

	public function new(vDomId: VDomId) {
		super(vDomId, EElement);
	}
	
	public function addChild(e: VDomNode): Void {
		children.push(e);
	}
	
	public function addTooltip(interactType: String, animationType: String, 
		hAlign: Null<Float>, vAlign: Null<Float>,
		hideDistanceX: Null<Int>, hideDistanceY: Null<Int>,
		tooltip: VDomComponent): Void {
		
		tooltipList.push(
			{
				interactType: interactType,
				animationType: animationType,
				tooltip: tooltip,
				hAlign: hAlign.or(0.5),
				vAlign: vAlign.or(0.0),
				hideDistanceX: hideDistanceX.or(M.MAX_INT),
				hideDistanceY: hideDistanceY.or(M.MAX_INT)
			}
		);
	}
	
	override public function asElement(): VDomElement {
		return this;
	}
}