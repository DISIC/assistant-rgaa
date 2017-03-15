import $ from 'jquery';
import join from '../../common/api/join';
import serializeAttributes from '../api/serializeAttributes';
import showCodeNearElement from '../api/showCodeNearElement';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 */
export const describe = (intl, selector, attributes, {showMissing = false} = {}) =>
	intl.formatHTMLMessage({
		id: 'Helper.showAttributes'
	}, {
		selector: sanitize(selector),
		attributes: join(attributes),
		attributeCount: attributes.length,
		showMissing
	});

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
