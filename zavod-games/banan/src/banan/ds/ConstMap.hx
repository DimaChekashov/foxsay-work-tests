package banan.ds;

import haxe.Constraints.IMap;

@:forward(copy)
abstract ConstMap<K,V>(Map<K,V>) from Map<K,V> {
	
	@:arrayAccess public inline function get(key:K): Null<V> return this.get(key);	
	public inline function exists(key:K) return this.exists(key);
	public inline function keys():Iterator<K> return this.keys();
	public inline function iterator():Iterator<V> { return this.iterator(); }
	public inline function keyValueIterator(): KeyValueIterator<K, V> { return this.keyValueIterator(); }
	public inline function copy(): Map<K, V> return this.copy();
	public inline function __getMutable():Map<K,V> return this;
	@:to public inline function toKeyValueIterable(): KeyValueIterable<K,V> { return (cast this: IMap<K,V>); }
}