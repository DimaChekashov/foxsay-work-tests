package jetgui.data;

import banan.basis.HashSet;

using banan.basis.IteratorHelper;

typedef ComputeFn<T> = ()->Null<T>;

class Value<T> extends Observable implements IObserver {
	
	private var value: Null<T> = null;
	private var isInvalid: Bool = false;
	private var compute(default, null): Null<ComputeFn<T>> = null;
	private var observables: HashSet<Observable> = new HashSet();
	
	public function new(?v: Null<T>): Void {
		set(v);
	}
	
	public function get(): Null<T> {
		
		if (isInvalid) {
			validate();
		}
		
		notifyValueAccessed();
		return value;
	}
	
	public function set(newValue: Null<T>): Void  {
		
		if (compute != null) {

			unsubscribeFromAll();

			compute = null;
			isInvalid = false;
			Observable.context.removeInvalidValue(this);
		}
		
		setValue(newValue);
	}
	
	public function setCompute(fn: ComputeFn<T>): Void {
		
		this.compute = fn;
		invalidate();
	}
	
	public function onObservableChanged(): Void {
		invalidate();
	}
	
	public function onSubscribed(o: Observable): Void {
		observables.push(o);
	}

	public function onUnsubscribed(o: Observable): Void {
		observables.remove(o);
	}

	public function unsubscribeFromAll(): Void {
		observables.iterator().forEach(it -> it.unsubscribe(this));
	}

	private function invalidate(): Void {
		
		unsubscribeFromAll();

		if (!isInvalid) {

			isInvalid = true;
			Observable.context.addInvalidValue(this);
			notifyValueChanged();
		}
	}
	
	public function validate(): Void {
		
		if(compute != null) {
			computeValue();
		}
		isInvalid = false;
		Observable.context.removeInvalidValue(this);
	}
	
	private function computeValue(): Void {
		
		Observable.pushObserver(this);
		var v: Null<T> = compute();
		Observable.popObserver();
		setValue(v);
	}
	
	private function setValue(newValue: Null<T>): Void {

		if(value != newValue) {
			
			value = newValue;
			notifyValueChanged();
		}
	}
}
