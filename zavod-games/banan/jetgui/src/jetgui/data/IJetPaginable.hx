package jetgui.data;

interface IJetPaginable {
	
	/**
	 * Go to next item, skipping some defined amount of items.
	 * @param itemCount optional item amount to skip
	 */
	function next(?itemCount: Int): Void;

	/**
	 * Go to previous item, skipping some defined amount of items.
	 * @param itemCount optional item amount to skip
	 */
	function prev(?itemCount: Int): Void;

	/**
	 * Go to first item or page.
	 */
	function toFirst(): Void;

	/**
	 * Go to last item or page.
	 */
	function toLast(): Void;

	function atFirst(): Bool;
	function atLast(): Bool;

	function gotoPage(page: Int): Void;
	function getPageCount(): Int;
	function getCurrentPage(): Int;
}