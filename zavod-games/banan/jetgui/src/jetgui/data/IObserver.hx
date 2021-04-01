package jetgui.data;

interface IObserver {
	
	function onSubscribed(o: Observable): Void;
	function onUnsubscribed(o: Observable): Void;
	function onObservableChanged(): Void;
	function unsubscribeFromAll(): Void;
}
