import {apply as addClassName, revert as removeClassName} from './addClassName';



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
export const apply = (id, selector) =>
	addClassName(id, selector, 'rgaaExt-OutlineHelper');

/**
 *	Removes outlines that were previously disabled using apply().
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const revert = (id, selector) =>
	removeClassName(id, selector, 'rgaaExt-OutlineHelper');
