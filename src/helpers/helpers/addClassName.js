import $ from 'jquery';



/**
 *
 */
export const apply = (id, selector, className) =>
	$(selector).addClass(className);

/**
 *
 */
export const revert = (id, selector, className) =>
	$(selector).removeClass(className);
