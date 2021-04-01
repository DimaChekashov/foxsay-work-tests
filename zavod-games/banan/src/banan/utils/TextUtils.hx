package banan.utils;

class TextUtils {
	
	private static var formatCache: Map<String, Array<String>> = new Map();
	
	/**
	 * calls `Std.string` and removes `'\n'` and `'\t'` in `obj`
	 * @param obj 
	 * @return String
	 */
	static public function toLine(obj: Dynamic): String {
		return StringTools.replace(StringTools.replace(Std.string(obj), '\n', ''),'\t', '');
	}
	
	public static function format(template: String, parameters: Dynamic): String {
		
		var compiled: Array<String> = formatCache[template];
		if (compiled == null) {

			compiled = [];
			formatCache[template] = compiled;
			
			var regex:EReg = ~/{(\w+)}/;
			var s = template;
			while (regex.match(s)) {
				compiled.push(regex.matchedLeft());
				compiled.push(regex.matched(1));
				s = regex.matchedRight();
			}
			compiled.push(s);
		}

		// compiled format is this: [constString, paramName, constString, paramName... constString]
		// compiled.length is uneven
		var result = new StringBuf();
		result.add(compiled[0]);
		for (i in 1...Math.ceil(compiled.length / 2)) {
			
			var paramName: String = compiled[i * 2 - 1];
			var paramValue: String = Std.string(Reflect.getProperty(parameters, paramName));
			var constString: String = compiled[i * 2];
			result.add(paramValue);
			result.add(constString);
		}
		
		return result.toString();
	}
	
	public static function formatFloat(value: Null<Float>, delimiter: String = " ", precision: Null<Int> = 2): Null<String> {
		
		if(value == null || Math.isNaN(value)) {
			return null;
		}
		
		var isNegative: Bool = false;
		if (value < 0.0) {
			
			isNegative = true;
			value = -value;
		}
		
		var intPart: Int = Math.floor(value);
		var fracPart: Float = value - intPart;
		
		var result = "";
		
		do {
			
			var s: String = Std.string(intPart % 1000);
			intPart = Math.floor(intPart / 1000);
			
			if (intPart != 0) {
				s = StringTools.lpad(s, '0', 3);
			}
			
			result = s + (result.length > 0 ? delimiter + result : result);
		} while(intPart > 0);
		
		if (precision > 0) {
			
			var fracPartString: String = Std.string(Math.round(fracPart * Math.pow(10, precision)));
			fracPartString = StringTools.lpad(fracPartString, '0', precision);
			while (fracPartString.length > 0 && fracPartString.charCodeAt(fracPartString.length - 1) == '0'.code) {
				fracPartString = fracPartString.substr(0, fracPartString.length - 1);
			}
			if (fracPartString.length > 0) {
				result += '.' + fracPartString;
			}
		}
		
		if (isNegative) {
			result = '-' + result;
		}
		
		return result;
	}

	/**
	 * The same as `Json.stringify()` except that it uses `Std.string()` for all values, thus
	 * producing a stringified Json of single depth level.
	 */
	public static function singleDepthStringify(raw: Dynamic, ?space: String, ?excludeKeys: Array<String>): String {

		function replacer(key: Dynamic, value: Dynamic): Dynamic {

            if (key == "") return value; // Don't touch the root key
			if (excludeKeys != null && excludeKeys.indexOf(key) >= 0) return value;

            return try {
                toLine(value);
            } catch (_: Any) {
                value;
            }
        }

        return haxe.Json.stringify(raw, replacer, space);
	}
	
	public static function sortAlphabetically<T>(array: Array<T>, getStr: T -> String): Array<T> {
		
		array = array.copy();
		array.sort(compareStrings.bind(_, _, getStr));
		
		return array;
	}
	
	public static inline function compareStrings<T>(a: T, b: T, getStr: T -> String): Int {
		
		var aStr: String = getStr(a).toUpperCase();
		var bStr: String = getStr(b).toUpperCase();
		
		return
			if (aStr < bStr) {
				-1;
			}
			else if (aStr > bStr) {
				1;
			} 
			else {
				0;
			}
	}
}