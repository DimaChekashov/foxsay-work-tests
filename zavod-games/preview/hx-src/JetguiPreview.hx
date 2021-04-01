package;

import jetgui.vdom.VDomComponent;
import jetgui.vdom.VDomId;
import jetgui.vdom.VDomNode;

typedef TCreateComponentFun = (vDomId: VDomId)->VDomNode;
typedef TCreateJtpInstanceFun = ()->Dynamic;

@:expose
@:keep
class JetguiPreview {
	
	public static var classList: Map<String, Class<Dynamic>> = new Map();
	public static var enumList: Map<String, String> = new Map();
	public static var observableClass = jetgui.data.Observable;
	public static var guiFunctionList = jetgui.fn.GuiFunctionList;
	
	public static function createVComponent(name: String, vDomId: VDomId): VDomNode {
		
		var cls: Class<Dynamic> = classList[name];
		var isComponentClass: Bool = isClass(cls, VDomComponent);
		var result: VDomComponent = isComponentClass ? Type.createInstance(cls, [vDomId]) : null;
		return result;
	}
	
	public static function isJtpEnum(name: String): Bool {
		return enumList.exists(name);
	}
	
	public static function createJtpInstance(name: String): Dynamic {
		
		var cls: Class<Dynamic> = classList[name];
		var isJtpClass: Bool = name.substr(0, 3) == 'Jtp';
		var result: VDomComponent = isJtpClass ? Type.createInstance(cls, []) : null;
		return result;
	}
	
	private static function isClass(cls: Class<Dynamic>, base: Class<Dynamic>): Bool {
		
		while (cls != null && cls != base) {
			cls = Type.getSuperClass(cls);
		}
		
		return cls != null;
	}
	
	public static function main(): Void {
    
    //force compiler to define anything needed for setProperty to work
    var t = {};
    Reflect.setProperty(t, "hello", "world");
    
    //workaround haxe 4 preview 5 bug: https://github.com/HaxeFoundation/haxe/issues/7581
    Type.resolveEnum("");
	}
}