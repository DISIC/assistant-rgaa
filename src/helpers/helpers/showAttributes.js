import $ from 'jquery';
import serializeAttributes from '../api/serializeAttributes';
import showCodeNearElement from '../api/showCodeNearElement';
import showTagApi from '../api/showTag';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 */
export const describe = (selector, attributes) => `
	Affiche les attributs <code>${attributes.join(', ')}</code>
	des éléments <code>${sanitize(selector)}</code>.
`;

/**
 *	Shows a box containing attributes' name and value on
 *	each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {array} attributes - Attribute list.
 *	@param {object} options - Options:
 *		- {boolean} showMissing - Whether or not to show attributes
 *			that aren't set.
 *	@param {boolean} showTag - Whether or not to show the element's tag
 */
export const apply = (id, selector, attributes, {showMissing = false, showTag = false} = {}) =>
	$(selector).each((i, element) => {
		const $element = $(element);
		const html = serializeAttributes($element, attributes, showMissing);

		if (html) {
			showCodeNearElement(
				$element,
				$('<code />', {
					class: `${id} rgaaExt-Helper rgaaExt-ShowAttributesHelper`,
					html
				})
			);
		}

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
