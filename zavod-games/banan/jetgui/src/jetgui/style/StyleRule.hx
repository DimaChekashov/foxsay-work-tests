package jetgui.style;

class StyleRule {
	
	public var selector(default, null): StyleSelector;
	public var style(default, null): Style;
	public var specificity(default, null): Int;
	
	public function new(selector: StyleSelector, style: Style) {
		
		this.selector = selector;
		this.style = style;
		
		var idCount: Int = countId(selector);
		var classCount: Int = countClass(selector);
		this.specificity = idCount * 1000 + (classCount < 1000 ? classCount : 1000);
	}
	
	private function countId(selector: StyleSelector): Int {
		
		return switch(selector) {
			case EAll: 0;
			case EClass(_): 0;
			case EId(_): 1;
			case EOr(_): throw "or selector not implemented";
			case EAnd(selectorList): 
				var result = 0;
				for (sub in selectorList) {
					result += countId(sub);
				}
				result;
				
			case EParent(parentSelector, childSelector): 
				countId(parentSelector) + countId(childSelector);
		}
	}
	
	private function countClass(selector: StyleSelector): Int {
		
		return switch(selector) {
			case EAll: 0;
			case EClass(_): 1;
			case EId(_): 0;
			case EOr(_): throw "or selector not implemented";
			case EAnd(selectorList): 
				var result = 0;
				for (sub in selectorList) {
					result += countClass(sub);
				}
				result;
				
			case EParent(parentSelector, childSelector): 
				countClass(parentSelector) + countClass(childSelector);
		}
	}
}