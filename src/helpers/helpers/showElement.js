import $ from 'jquery';
import join from '../../common/api/join';
import serializeElement from '../api/serializeElement';
import showCodeNearElement from '../api/showCodeNearElement';
import hideHelperElement from '../api/hideHelperElement';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 */
export const describe = (intl, selector, attributes = [], {
	showEmpty = false,
	showName = true,
	showMissingAttributes = false,
	showContent = false
} = {}) =>
	intl.formatHTMLMessage({
		id: 'Helper.showElement'
	}, {
		selector: sanitize(selector),
		attributes: join(attributes),
		attributeCount: attributes.length,
		showEmpty,
		showName,
		showMissingAttributes,
		showContent
	});

/**
 *	Shows a DOM element.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {array} attributes - Children attributes to show.
 *	@param {object} options - Options:
 *		- {bool} showEmpty - Show the tag even if it is empty
 *			(i.e. it has neither content nor attributes.
 *		- {bool} showName - Show tag name.
 *		- {bool} showMissingAttributes - Show requested attributes
 *			that are not set on the element.
 *		- {bool} showContent - Show text content.
 */
export const apply = (id, selector, attributes = [], options = {}) =>
	$(selector).each((i, element) => {
		const $element = $(element);
		const html = serializeElement($element, attributes, options);

		if (html) {
			showCodeNearElement(
				$element,
				$('<code />', {
					class: `${id} rgaaExt-Helper rgaaExt-ShowElementHelper`,
					html
				})
			);
		}
	});

/**
 *	Hides children of particular elements.
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	hideHelperElement(`.${id}`);
