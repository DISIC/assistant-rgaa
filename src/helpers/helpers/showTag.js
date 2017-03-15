import $ from 'jquery';
import showTag from '../api/showTag';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 */
export const describe = (intl, selector) =>
	intl.formatHTMLMessage({
		id: 'Helper.showTag'
	}, {
		selector: sanitize(selector)
	});



/**
 *	Shows a box containing an element's tag on
 *	each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const apply = (id, selector) =>
	$(selector).each((i, element) =>
		showTag(id, $(element))
	);



/**
 *	Removes all boxes previously added using apply().
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
