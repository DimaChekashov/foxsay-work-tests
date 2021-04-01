package jetgui.data;

import banan.ds.ConstMap;

@:forward(exists, remove, clear, keys, iterator, keyValueIterator, toString)
abstract JetMap<K,V>(MapObservable<K,V>) from MapObservable<K,V> to Iterable<V> to KeyValueIterable<K, V> {

	@:from public static function fromMap<K,V>(map: Null<Map<K,V>>): Null<JetMap<K,V>> {
		return map != null ? new MapObservable<K,V>(map) : null;
	}
	
	@:from public static function fromConstMap<K,V>(map: Null<ConstMap<K,V>>): Null<JetMap<K,V>> {
		return map != null ? new MapObservable<K,V>(map.__getMutable()) : null;
	}
	
	@:arrayAccess public inline function get(k: K): Null<V> {
		return this.get(k);
	}

	@:arrayAccess public inline function set(k: K, v: V): Void {
		this.set(k, v);
	}
}

private class MapObservable<K,V> extends Observable {
	
	private var map: Map<K,V>;
	
	public function new(map: Map<K,V>) {

		this.map = map.copy();
		notifyValueChanged();
	}
	
	public function get(k: K): Null<V> {
		
		notifyValueAccessed();
		return map.get(k);
	}
	
	public function set(k: K, v: V): Void {
		
		if(map.get(k) != v) {
			
			map.set(k, v);
			notifyValueChanged();
		}
	}
	
	public function exists(k: K): Bool {
		
		notifyValueAccessed();
		return map.exists(k);
	}
	
	public function remove(k: K): Bool {
		
		return
			if (map.remove(k)) {
				
				notifyValueChanged();
				true;
			}
			else {
				false;
			}
	}
	
	public function clear(): Void {
		
		notifyValueChanged();
		map.clear();
	}
	
	public function keys(): Iterator<K> {
		
		notifyValueAccessed();
		return map.keys();
	}
	
	public function iterator(): Iterator<V> {
		
		notifyValueAccessed();
		return map.iterator();
	}

	public function keyValueIterator(): KeyValueIterator<K, V> {
		
		notifyValueAccessed();
		return map.keyValueIterator();
	}
	
	public function toString(): String { 
		
		notifyValueAccessed();
		return map.toString();
	}
}