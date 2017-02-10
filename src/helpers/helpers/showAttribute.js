import $ from 'jquery';
import showAttribute from '../api/showAttribute';
import showTagApi from '../api/showTag';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 *	@param {string} attribute - Attribute name.
 */
export const describe = (selector, attribute) => `
	Affiche l'attribut <code>${attribute}</code>
	des éléments <code>${selector}</code>.
`;

/**
 *	Shows a box containing an attribute's name and value on
 *	each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} attribute - Attribute name.
 *	@param {object} options - Options:
 *		- {boolean} showMissing - Whether or not to show attributes
 *			that aren't set.
 *	@param {boolean} showTag - Whether or not to show the element's tag
 */
export const apply = (id, selector, attribute, {showMissing = false, showTag = false} = {}) =>
	$(selector).each((i, element) => {
		showAttribute(id, $(element), attribute, showMissing);
		if (showTag) {
			showTagApi(id, $(element));
		}
	});

/**
 *	Removes all boxes previously added using apply().
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
