import $ from 'jquery';
import {cond} from '../api/description';
import serializeAttributes from '../api/serializeAttributes';
import showCodeNearElement from '../api/showCodeNearElement';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 */
export const describe = (selector, attributes, {showMissing = false} = {}) =>
	`Affiche les attributs <code>${attributes.join(', ')}</code>
	des éléments <code>${sanitize(selector)}</code>
	${cond(showMissing, '(y compris si ils ne sont pas définis)')}`;

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
 */
export const apply = (id, selector, attributes, {showMissing = false} = {}) =>
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
	});

/**
 *	Removes all boxes previously added using apply().
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
