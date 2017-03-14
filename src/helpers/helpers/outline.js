import $ from 'jquery';
import {cond, list} from '../api/description';
import {apply as addClassName, revert as removeClassName} from './addClassName';
import showTagApi from '../api/showTag';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 */
export const describe = (selector, {showTag = false} = {}) =>
	list(
		`Entoure les éléments <code>${sanitize(selector)}</code>`,
		cond(showTag, 'affiche leur type')
	);

/**
 *	Adds an outline to each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const apply = (id, selector, {showTag = false} = {}) => {
	addClassName(id, selector, 'rgaaExt-OutlineHelper');

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
 *	@param {string} selector - Selector.
 */
export const revert = (id, selector) => {
	removeClassName(id, selector, 'rgaaExt-OutlineHelper');
	$(`.${id}`).remove();
};
