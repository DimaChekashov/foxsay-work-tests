package jetgui.style;

private typedef TStyleRuleItem = {
	order: Int, 
	rule: StyleRule
}

class StyleSorter {

	/**
	 * recieves array of arrays of style rules
	 * top level array is array of imported jss files
	 * second level arrays are arrays of style rules defined in these jss files
	 * both in declaration order
	 * 
	 * returns array of style rules sorted by priority, which is defined based on specificity and declaration order
	 * more prioritized rules go later
	 */
	public static function sortStyles(rules: Array<Array<StyleRule>>): Array<StyleRule> {
		
		var i: Int = 0;
		var items: Array<TStyleRuleItem> = [for (list in rules) for (rule in list) {order: i++, rule: rule}];
		items.sort((a: TStyleRuleItem, b: TStyleRuleItem)->(a.rule.specificity - b.rule.specificity) * 10000 + a.order - b.order);
		
		return items.map(item->item.rule);
	}
	
}