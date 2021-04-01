package jetgui.data;

import banan.basis.HashSet;

using banan.basis.IteratorHelper;

@:allow(jetgui.data.Observable)
class ObservableContext {
	
	public var time: Float;

	private var currentObserver(default, null): Null<IObserver>;
	private var observerStack: Array<IObserver> = [];
	private var allInvalidValue: HashSet<Value<Dynamic>> = new HashSet();

	private var globalObservables = new HashSet();

	public function updateAllValue(): Void {
		
		for (value in allInvalidValue) {
			value.validate();
		}
	}
	
	public function addInvalidValue(value: Value<Dynamic>): Void {
		allInvalidValue.push(value);
	}
	
	public function removeInvalidValue(value: Value<Dynamic>): Void {
		allInvalidValue.remove(value);
	}
	
	/**
	 * Between calls to pushObserver() and popObserver() all access to Observable will be remembered.
	 * Changes to any of accessed observables will trigger observer.onObservableChanged.
	 * All previously remembered observables will be forgotten.
	 */
	public function pushObserver(observer: IObserver): Void {
		
		if(currentObserver != null) {
			observerStack.push(currentObserver);
		}
		currentObserver = observer;
	}
	
	public function popObserver(): Void {
		currentObserver = observerStack.pop();
	}
	
	public function notifyValueAccessed(observable: Observable): Void {

		globalObservables.push(observable);

		if (currentObserver != null) {
			observable.subscribe(currentObserver);
		}
	}

	/**
	 * Unfortunately, at the moment, we cannot reliably connect JetGUI `Component`s with all their `Value`s due to 
	 * implicit manner of how `Value`s work. Therefore we can't reliably dispose `Value`s when their `Component` 
	 * is disposing. 
	 * This function is a workaround of this problem. It triggers invalidation of every registered `Value` in the 
	 * game regardless of when it's been used, thus triggering resync of every `Component`. After that we can safely 
	 * dispose of all the subscriptions and observables, because `Component`s will restore needed subscriptions at
	 * the resync stage.
	 */
	public function clear() {

		observerStack.resize(0);
		currentObserver = null;

		allInvalidValue.clear();

		// Trick to invalidate all values, so they can initiate resync of their components
		// and unsubscription from all values.
		globalObservables.iterator().forEach(it -> it.notifyValueChanged());

		// At the moment, there must be no observers left subscribed
		globalObservables.clear();
	}

	public function new() {}
}

@:allow(jetgui.data.ObservableContext)
class Observable {

	private static var context: ObservableContext = new ObservableContext();
	
	private static function replaceContext(o: {context: ObservableContext}): Void {
		context = o.context;
	}
	
	public static function updateAllValue(time: Float): Void {
		
		context.time = time;
		context.updateAllValue();
	}
	
	public static function getTime(): Float {
		return context.time;
	}
	
	public static function pushObserver(observer: IObserver): Void {
		context.pushObserver(observer);
	}
	
	public static function popObserver(): Void {
		context.popObserver();
	}

	public static function clearContext() {
		context.clear();
	}

	public static function debugCountObservables(): Int {
		return context.globalObservables.iterator().fold((_, count) -> ++count, 0);
	}

	private var observers: HashSet<IObserver> = new HashSet();
	
	/**
	 * There is no way to subscribe to `Observable` changes other than using
	 * `context.pushObserver()`/`context.popObserver()` and `notifyValueAccessed()` mechnanics.
	 */
	private function subscribe(observer: IObserver): Void {

		observers.push(observer);
		observer.onSubscribed(this);
	}

	public function unsubscribe(observer: IObserver): Void {

		observers.remove(observer);
		observer.onUnsubscribed(this);
	}

	private function unsubscribeAll(): Void {
		observers.iterator().forEach((it) -> unsubscribe(it));
	}

	@:final inline private function notifyValueChanged(): Void {
		
		for (observer in observers) {
			observer.unsubscribeFromAll(); // After value changed, observers need to resubscribe to observables
			observer.onObservableChanged();
		}
	}
	
	@:final inline private function notifyValueAccessed(): Void {
		context.notifyValueAccessed(this);
	}
}