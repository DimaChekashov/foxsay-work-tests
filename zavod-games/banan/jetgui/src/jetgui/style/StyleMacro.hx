package jetgui.style;

import haxe.macro.Expr;
import haxe.macro.Type;
import haxe.macro.Context;
import haxe.macro.TypeTools;

//use this for macros or other classes
class StyleMacro {
	
	public static macro function addStyleFields(): Array<Field> {
		
		var buildFields: Array<Field> = Context.getBuildFields();
		var fields: Array<ClassField> = getStyleFields();
		for (field in fields) {
			
			var name: String = field.name;
			var getterName: String = 'get_$name';
			var setterName: String = 'set_$name';
			var fieldType: ComplexType = TypeTools.toComplexType(field.type);
			var tempClass = macro class {
				
				public var $name(get, set): $fieldType;
				
				@:extern inline private function $getterName() {
					return style.$name;
				}
				
				@:extern inline private function $setterName(v) {
					return style.$name = v;
				}
			}
			
			for (field in tempClass.fields) {
				buildFields.push(field);
			}
		}
		
		return buildFields;
	}

	#if macro

	private static function getStyleFields(): Array<ClassField> {
		
		var type: Type = Context.resolveType(macro : jetgui.style.Style, Context.currentPos());
		type = Context.followWithAbstracts(type);
		var fields: Array<ClassField> = switch (type) {
			case Type.TAnonymous(_.get().fields => fields): fields;
			default: throw 'error';
		}
		
		return fields;
	}

	#end
}