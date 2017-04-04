import $ from 'jquery';
import showTagApi from '../api/showTag';
import hideHelperElement from '../api/hideHelperElement';
import {sanitize} from '../api/selectors';



/**
 *	@var {string} selector - Selector.
 *	@var {bool} showTag
 */
export const defaults = {
	selector: '',
	showTag: false
};

/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 *	@param {object} options - Options.
 */
export const describe = (intl, {selector, showTag} = defaults) =>
	intl.formatHTMLMessage({
		id: 'Helper.outline'
	}, {
		showTag,
		selector: sanitize(selector)
	});

/**
 *	Adds an outline to each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {object} options - Options.
 */
export const apply = (id, {selector, showTag} = defaults) => {
	$(selector).addClass('rgaaExt-OutlineHelper');

	if (showTag) {
		$(selector).each((i, element) => {
			showTagApi(id, $(element));
		});
	}
};

/**
 *	Removes outlines that were previously disabled using apply().
 *
 *	@param {string} id - UUID.
 *	@param {object} options - Options.
 */
export const revert = (id, {selector} = defaults) => {
	$(selector).removeClass('rgaaExt-OutlineHelper');
	hideHelperElement(`.${id}`);
};
