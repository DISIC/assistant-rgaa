import $ from 'jquery';
import showTag from '../api/showTag';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 */
export const describe = (selector) => `
	Affiche les éléments <code>${selector}</code>.
`;



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
