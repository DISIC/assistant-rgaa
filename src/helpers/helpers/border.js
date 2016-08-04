import {apply as addClassName, revert as removeClassName} from './addClassName';



/**
 *	Adds a border to each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const apply = (id, selector) =>
	addClassName(id, selector, 'rgaaExt-BorderHelper');

/**
 *	Removes borders that were previously disabled using apply().
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const revert = (id, selector) =>
	removeClassName(id, selector, 'rgaaExt-BorderHelper');
