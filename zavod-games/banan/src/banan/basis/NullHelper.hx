package banan.basis;

class NullHelper {
	
	/**
	 * Returns first non null argument
	 */
	public static inline function or<T>(a: Null<T>, b) {
		return a != null ? a : b;
	}

	/**
	 * Calls an `action` if `it` is not `null`.
	 */
	public static inline function ifSome<T>(it: Null<T>, action: (it: T) -> Void): Null<T> {

        if (it != null) {
            action(it);
        }
		return it;
	}
	
	public static inline function ifNone<T>(it: Null<T>, action: Void -> Void): Null<T> {

        if (it == null) {
            action();
        }
		return it;
    }

	public static inline function orProvide<T>(it: Null<T>, getDefault: Void -> T): T {

		return if (it != null) {
			it;
		} else {
			getDefault();
		}
	}
	
	public static inline function orThrow<T>(it: Null<T>, ?typeCode: Int, message: String, ?posInfos: haxe.PosInfos): T {
		
		return if (it != null) {
			it;
		} else {
			Error.throwCustom(typeCode, message, null, Error.getPositionDescr(posInfos));
		}
	}

	public static inline function isSome<T>(it: Null<T>): Bool {
		return it != null;
	}

	public static inline function isNone<T>(it: Null<T>): Bool {
		return it == null;
	}

	public static inline function mapSome<T, R>(it: Null<T>, transform: T -> R): Null<R> {
		
		return if (it != null) {
			transform(it);
		} else null;
	}

	public static inline function filter<T>(it: Null<T>, predicate: T -> Bool): Null<T> {

		return 
			if (it != null && predicate(it)) {
				it;
			} else null;
	}

	/**
	 * Casts an object to the `targetType` if it's possible, returns `null` otherwise.
	 */
	@:extern public static inline function as<T, R>(it: T, targetType: Class<R>): Null<R> {
		return Std.is(it, targetType) ? cast it : null;
	}

	/**
	 * Consume the wrapped value.
	 */
	public static inline function branch<T, R>(it: Null<T>, ifSome: T -> R, ifNone: Void -> R): R {
		return it != null ? ifSome(it) : ifNone();
	}
	
	public static inline function safeCall<T>(fn: Void->T): Null<T> {
		return try { fn(); } catch(_: Dynamic) { null; };
	}
}
