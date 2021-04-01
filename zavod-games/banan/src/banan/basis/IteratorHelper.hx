package banan.basis;

import banan.basis.Tuple;
import haxe.iterators.MapKeyValueIterator;

/**
 * This class is mostly a copy of `Lambda`, which works with `Iterator` instead of `Iterable`.
 * In some cases it is more convenient. Besides, using `Iterable` may have an overhead on static
 * targets.
 */
class IteratorHelper {
	
	private static final emptyIterator: Iterator<Dynamic> = {
		hasNext: () -> false,
		next: () -> null
	};

	@:noUsing
	public static inline function empty<T>(): Iterator<T> {
		return cast emptyIterator;
	}

	public static inline function map<T, R>(it: Iterator<T>, transform: T -> R): Iterator<R> {
		return new TransformIterator(it, transform);
	}

	public static inline function mapPair<T1, T2, R>(it: Iterator<Tuple2<T1, T2>>, transform: (T1, T2) -> R): Iterator<R> {
		return new TransformIterator(it, pair -> transform(pair.a, pair.b));
	}

	public static inline function mapTriple<T1, T2, T3, R>(it: Iterator<Tuple3<T1, T2, T3>>, transform: (T1, T2, T3) -> R): Iterator<R> {
		return new TransformIterator(it, triple -> transform(triple.a, triple.b, triple.c));
	}

	public static inline function mapKeyVal<K, V, R>(it: KeyValueIterator<K, V>, transform: (K, V) -> R): Iterator<R> {
		return new TransformIterator(it, keyVal -> transform(keyVal.key, keyVal.value));
	}

	public static inline function mapIndexed<T, R>(it: Iterator<T>, transform: (Int, T) -> R): Iterator<R> {

		var index: Int = 0;
		return new TransformIterator(it, t -> transform(index++, t));
	}

	public static inline function mapNotNull<T, R>(it: Iterator<T>, transform: T -> Null<R>): Iterator<R> {
		return filterNotNull(map(it, transform));
	}

	/**
	 * Iterate over pairs of items.  
	 * **Example**: given the iterator over the array [1, 2, 3, 4, 5], returns the iterator 
	 * that will produce pairs (1, 2), (2, 3), (3, 4), (4, 5).  
	 * If there's less than 2 items in the original iterator, `hasNext()` of the returned iterator
	 * will return `false`.
	 */
	public static inline function chainedPairs<T>(it: Iterator<T>): Iterator<Tuple2<T, T>> {
		return new ChainedPairIterator(it);
	}

	/**
	 * Returns `Iterator` consisting only of values that conform to `predicate`.
	 * **Warning**: if src `Iterator` is unbounded, resulting `Iterator` may potentially
	 * loop forever if there's no values conforming the `predicate`.
	 */
	public static inline function filter<T>(it: Iterator<T>, predicate: T -> Bool): Iterator<T> {
		return new FilterIterator(it, predicate);
	}

	public static inline function filterNotNull<T>(it: Iterator<Null<T>>): Iterator<T> {
		return new FilterIterator(it, it -> it != null);
	}

    public static inline function forEach<T>(iterator: Iterator<T>, action: (it: T) -> Void): Void {

        for(item in iterator) {
            action(item);
        }
    }

	public static inline function forEachKeyVal<K, V>(it: MapKeyValueIterator<K, V>, action: (K, V) -> Void): Void {
        
        for (keyVal in it) {
            action(keyVal.key, keyVal.value);
        }
    }

	public static inline function forEachPair<T1, T2>(it: Iterator<Tuple2<T1, T2>>, action: (T1, T2) -> Void): Void {

		for (pair in it) {
			action(pair.a, pair.b);
		}
	}

    /**
		Functional fold on Iterable `it`, using function `f` with start argument
		`first`.

		If `it` has no elements, the result is `first`.

		Otherwise the first element of `it` is passed to `f` alongside `first`.
		The result of that call is then passed to `f` with the next element of
		`it`, and so on until `it` has no more elements.

		If `it` or `f` are null, the result is unspecified.
	**/
    public static inline function fold<A,B>(it : Iterator<A>, f : A -> B -> B, first : B) : B {
        
		for(x in it) {
			first = f(x, first);
        }
		return first;
	}

	/**
		Returns the number of elements in `it` for which `pred` is true, or the
		total number of elements in `it` if `pred` is null.

		This function traverses all elements.
	**/
	public static inline function count<A>( it : Iterator<A>, ?pred : A -> Bool ): Int {

		var n = 0;
		if(pred == null) {

			for(_ in it)
				n++;
		}
		else {

			for(x in it) {

				if(pred(x)) {
					n++;
				}
			}
		}
		return n;
	}

	/**
		Creates an Array from Iterator `it`.

		If `it` is an Array, this function returns a copy of it.
	**/
	public static function toArray<A>(it : Iterator<A>) : Array<A> {

		var a = new Array<A>();
		for(i in it) {
			a.push(i);
		}
		return a;
	}

	/**
	 * @return first element or `null` if `it` is empty
	 */
	public static inline function first<T>(it: Iterator<T>): Null<T> {
		return it.hasNext() ? it.next() : null;
	}

	public static inline function find<T>(it: Iterator<T>, predicate: T -> Bool): Null<T> {

		var needle: Null<T> = null;
		for (item in it) {

			if (predicate(item)) {

				needle = item;
				break;
			}
		}
		return needle;
	}
}

private class TransformIterator<T, R> {
	private var _src: Iterator<T>;
	private var _transform: T -> R;

	public inline function new(src: Iterator<T>, transform: T -> R) {
		_src = src;
		_transform = transform;
	}

	public inline function hasNext(): Bool return _src.hasNext();
	public inline function next(): R return _transform(_src.next());
}

private class ChainedPairIterator<T> {

	private var _src: Iterator<T>;
	private var a: Null<T> = null;
	private var first: Bool = true;

	public inline function new(src: Iterator<T>) {
		_src = src;
	}

	public inline function hasNext(): Bool {

		if (first && _src.hasNext()) {

			a = _src.next();
			first = false;
		}
		return _src.hasNext();
	}
	
	public inline function next(): Tuple2<T, T> {

		var next = Tuple.of2(a, _src.next());
		a = next.b;
		return next;
	} 
}

private class FilterIterator<T> {

	private var _src: Iterator<T>;
	private var _predicate: T -> Bool;
	private var myNext: T = null;

	public inline function new(src: Iterator<T>, predicate: T -> Bool) {
		_src = src;
		_predicate = predicate;
	}

	public inline function hasNext(): Bool {

		myNext = null;
		while (_src.hasNext()) {

			var srcNext = _src.next();
			if (_predicate(srcNext)) {

				myNext = srcNext;
				break;
			}
		}
		return myNext != null;
	}
	
	public inline function next(): T {
		return myNext;
	} 
}