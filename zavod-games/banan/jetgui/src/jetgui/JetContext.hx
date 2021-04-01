package jetgui;
  
import banan.error.Error;

class JetContext {

	private var elementRefMap: Map<String, Array<Any>> = new Map();
	
	public function new() {
	}
	
	public function notify(notification: String, ?arg0: Any, ?arg1: Any): Void {
		Error.throwNotImplemented();
	}
	
	public function addElementRef(name: String, element: Any): Void {
		
		var arr: Array<Any> = elementRefMap[name];
		if (arr == null) {
			
			arr = [];
			elementRefMap[name] = arr;
		}
		
		if(arr.indexOf(element) < 0) {
			arr.push(element);
		}
	}
	
	public function removeElementRef(name: String, element: Any): Void {
		
		var arr: Array<Any> = elementRefMap[name];
		if (arr != null) {
			
			arr.remove(element);
			if (arr.length == 0) {
				elementRefMap.remove(name);
			}
		}
	}

	private function getElementRefImpl<T>(name: String, elementCls: Class<T>): Null<T> {
		
		var arr: Array<Any> = elementRefMap[name];
		var result: Any = (arr != null && arr.length > 0) ? arr[arr.length - 1] : null;
		return Std.is(result, elementCls) ? cast result : null;
	}
	
	private function getElementRefArrayImpl<T>(name: String, elementCls: Class<T>): Array<T> {
		
		final arr: Array<Any> = elementRefMap[name];
		return arr == null 
			? []
			: arr
				.map(el -> Std.is(el, elementCls) ? cast el : null)
				.filter(el -> el != null);
	}
}