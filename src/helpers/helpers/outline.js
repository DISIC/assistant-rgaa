import $ from 'jquery';
import {apply as addClassName, revert as removeClassName} from './addClassName';
import showTagApi from '../api/showTag';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 */
export const describe = (selector) =>
	`Entoure les éléments <code>${selector}</code>.`;

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
