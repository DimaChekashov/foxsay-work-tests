package jetgui.style;
import jetgui.data.IJetPaginable;
import jetgui.data.JetPaginatorBase;

typedef Style = {

	?padding: Int,
	?paddingX: Int,
	?paddingY: Int,
	?paddingLeft: Int,
	?paddingRight: Int,
	?paddingTop: Int,
	?paddingBottom: Int,
	?spacing: Float,
	?childrenAlign: Float,
	?resizeChildren: Bool,
	?reverseOrder: Bool, 
	?offsetLeft: Int,
	?offsetTop: Int,
	?offsetRight: Int,
	?offsetBottom: Int,
	?offsetX: Int,
	?offsetY: Int,
	?offset: Int,
	?pivotX: ESize,
	?pivotY: ESize,
	?pivot: ESize,
	?hAlign: Float,
	?vAlign: Float,
	?align: Float,
	?width: ESize,
	?height: ESize,
	?size: ESize,
	?font: String,
	?fontSize: Float,
	?textAlign: ETextAlign,
	?textVAlign: ETextVAlign,
	?wrap: Bool,
	?shadowOffsetX: Float,
	?shadowOffsetY: Float,
	?shadowColor: EColor,
	?flipX: Bool,
	?flipY: Bool,
	?flip: Bool,
	?textColor: EColor,
	?maxSizeX: Float,
	?maxSizeY: Float,
	?lineHeight: Float,
	?ontouchbegin: ()->Void,
	?onclick: ()->Void,
	?onlongtapbegin: ()->Void,
	?onlongtapend: ()->Void,
	?onlongtapmove: ()->Void,
	?ontouchend: ()->Void,
	?interact: EInteract,
	?disableInteractChild: Bool,
	?scissor: Bool,	
	?src: jetgui.JetAssetPath,
	?value: Any,
	?opacity: Float,
	?color: EColor,
	?colorMatrix: EColorMatrix,
	?outline: EColor,
	?fillColor: EColor,
	?fillImage: jetgui.JetAssetPath,
	?onTextChangedCb: String->Void,
	?animConfig: TAnimConfig,
	?scaleMode: EScaleMode,
	?url: String,
	?dragArc: Float,
	?sliderElementSize: Float,
	?sliderChildrenAlign: Float,
	?sliderElasticity: Float,
	?dragAxis: Axis,
	?scrollRange: Int,
	?arcStart: Float,
	?arcEnd: Float,
	?maxVisibleChars: Int
}