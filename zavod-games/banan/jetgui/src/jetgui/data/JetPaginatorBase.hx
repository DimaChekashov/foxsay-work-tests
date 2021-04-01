package jetgui.data;

import banan.error.Error;
import jetgui.data.JetArray;

class JetPaginatorBase<T> implements IJetPaginable {
	
	public var data(default, null): JetArray<T>;
	
	public var position(get, set): Int;
	public var visibleCount(get, set): Int;
	public var count(get, never): Int;
	public var pagesBefore(get, never): Int;
	public var pagesAfter(get, never): Int;
	
	private var vPosition: Value<Int>;
	private var vVisibleCount: Value<Int>;
	private var vCount: Value<Int>;
	
	private var isPageMode: Bool;
	private var isAllVisible: Bool; // will always set visibleCount to count if true
	
	private inline function get_position(): Int {
		return vPosition.get();
	}
	
	private inline function set_position(value: Int): Int {
		
		if(vPosition.get() != value) {
			
			vPosition.set(value);
			sync();
		}
		
		return value;
	}
	
	private inline function get_visibleCount():Int {
		return vVisibleCount.get();
	}
	
	private inline function set_visibleCount(value: Int): Int {
		
		if (vVisibleCount.get() != value) {
			
			vVisibleCount.set(value);
			sync();
		}
		
		return value;
	}
	
	private inline function get_count(): Int {
		return vCount.get();
	}
	
	private function get_pagesBefore(): Int {
		return Math.ceil(position / getPositionInc());
	}
	
	private function get_pagesAfter(): Int {
		return Math.ceil((getMaxPosition() - position) / getPositionInc());
	}
	
	public function new(params: TJetPaginatorBaseParams) {
		
		var visibleCount: Int = params.visibleCount == null ? 0 : params.visibleCount;
		var isPageMode: Bool = params.isPageMode == null ? true : params.isPageMode;
		var isAllVisible: Bool  = params.visibleCount == null;
		
		data = [];
		
		vPosition = new Value<Int>(0);
		vVisibleCount = new Value<Int>(visibleCount);
		vCount = new Value<Int>(0);
		
		this.isPageMode = isPageMode;
		this.isAllVisible = isAllVisible;
		
		sync();
	}
		
	public function next(?itemCount: Int): Void {
		position = position + (itemCount == null ? getPositionInc() : itemCount);
	}
	
	public function prev(?itemCount: Int): Void {
		position = position - (itemCount == null ? getPositionInc() : itemCount);
	}
	
	public function toFirst(): Void {
		position = 0;
	}

	public function toLast(): Void {
		position = getMaxPosition();
	}

	public function atFirst(): Bool {
		return position <= 0;
	}
	
	public function atLast(): Bool {
		return position >= getMaxPosition();
	}
	
	public function sync(): Void {
		
		vCount.set(getCount());
		
		if (isAllVisible) {
			vVisibleCount.set(count);
		}
		
		var currentPosition: Int = vPosition.get();
		var trimmedPosition: Int = Math.floor(Math.max(0, Math.min(getMaxPosition(), vPosition.get())));
		vPosition.set(trimmedPosition);
		
		data.resize(visibleCount);
		
		for (i in 0...visibleCount) {
			syncImpl(position + i, i);
		}
	}

	public function gotoPage(page: Int): Void {
		position = getPositionForPage(page);
	}
	
	private function getCount(): Int {
		Error.throwNotImplemented();
	}
	
	private function gotoPositionPage(pos: Int): Void {
		
		while (pos >= 0 && pos < position) {
			prev();
		}
		
		while (pos >= position + visibleCount && pos < count) {
			next();
		}
	}

	private function getPositionInc(): Int {
		return isPageMode ? visibleCount : 1;
	}

	// returns page count
	// minimum page count is 1
	public inline function getPageCount(): Int {
		return visibleCount != 0 && count != 0 ? Math.ceil(count / visibleCount) : 1;
	}
	
	public inline function getCurrentPage(): Int {
		return getPageForPosition(position);
	}
	
	private inline function getPageForPosition(position: Int): Int {
		return Math.ceil((position + 1) / visibleCount);
	}
	
	private inline function getPositionForPage(page: Int): Int {
		return isPageMode ? visibleCount * (page - 1) : page - 1;
	}
	
	private inline function getMaxPosition(): Int {
		return isPageMode ? visibleCount * (getPageCount() - 1) : count - visibleCount;
	}
	
	private function syncImpl(idxFrom: Int, idxTo: Int): Void {
		Error.throwNotImplemented();
	}
}