package jetgui.style;

enum StyleSelector {

	EAll; // *
	EClass(className: String); // .className
	EId(id: String); // #id
	EOr(selectorList: Array<StyleSelector>); // selector, selector
	EAnd(selectorList: Array<StyleSelector>); // selectorSelector
	EParent(parent: StyleSelector, child: StyleSelector); // parent > child
}
