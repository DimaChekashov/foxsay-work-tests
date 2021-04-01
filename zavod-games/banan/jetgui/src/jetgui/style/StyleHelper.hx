package jetgui.style;
import haxe.EnumTools;
import jetgui.element.Element;

class StyleHelper {

	public static function mergeStyles(target: Style, style: Style): Void {
		
		for (field in Reflect.fields(style)) {
			
			var value: Dynamic = Reflect.field(style, field);
			Reflect.setField(target, field, value);
		}
	}
	
	public static function isEqual(a: Null<Style>, b: Null<Style>): Bool {
		
		if (a == b) {
			return true;
		}
		else if (a == null || b == null) {
			return false;
		}
		else {
			
			for (pair in [[a, b], [b, a]]) {
				
				var style0: Style = pair[0];
				var style1: Style = pair[1];
				for (field in Reflect.fields(style0)) {
					
					var val0: Dynamic = Reflect.field(style0, field);
					var val1: Dynamic = Reflect.field(style1, field);
					if (!compareFields(val0, val1)) {
						return false;
					}
				}
				
			}
			
			return true;
		}
	}
	
	public static function checkStyleSelector(selector: StyleSelector, element: Element): Bool {
		
		return 	
			switch(selector) {
				
				case EAll: 
					true;
					
				case EClass(className):
					element.hasClass(className);
					
				case EId(id):
					element.id == id;
					
				case EOr(selectorList):
					var result: Bool = false;
					for (sub in selectorList) {
						
						if (checkStyleSelector(sub, element)) {
							
							result = true;
							break;
						}
					}
					result;
					
				case EAnd(selectorList):
					var result: Bool = true;
					for (sub in selectorList) {
						
						if (!checkStyleSelector(sub, element)) {
							
							result = false;
							break;
						}
					}
					result;
					
				case EParent(parentSelector, childSelector):
					var parent: Null<Element> = element.getParent();
					var parentResult: Bool = parent != null && checkStyleSelector(parentSelector, parent);
					var result: Bool = parentResult && checkStyleSelector(childSelector, element);
					result;
			}
		
	}
	
	private static inline function compareFields(a: Dynamic, b: Dynamic): Bool {
		
		return 
			if (Type.typeof(a).match(TEnum(_)) && b != null) {
				Type.enumEq(a, b);
			}
			else {
				a == b;
			}
	}
}