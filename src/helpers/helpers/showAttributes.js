import $ from 'jquery';
import join from '../../common/api/join';
import serializeAttributes from '../api/serializeAttributes';
import showCodeNearElement from '../api/showCodeNearElement';
import hideHelperElement from '../api/hideHelperElement';
import {sanitize} from '../api/selectors';



/**
 *	@var {string} selector - Selector.
 *	@var {array} attributes - Attribute list.
 *	@var {boolean} showMissing - Whether or not to show attributes
 *		that aren't set.
 */
export const defaults = {
	selector: '',
	attributes: [],
	showMissing: false
};

/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 *	@param {object} options - Options.
 */
export const describe = (intl, {selector, attributes, showMissing} = defaults) =>
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
 *	@param {object} options - Options.
 */
export const apply = (id, {selector, attributes, showMissing} = defaults) =>
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
 *	@param {object} options - Options.
 */
export const revert = (id) =>
	hideHelperElement(`.${id}`);
