import $ from 'jquery';
import join from '../../common/api/join';
import serializeElement from '../api/serializeElement';
import showCodeNearElement from '../api/showCodeNearElement';
import hideHelperElement from '../api/hideHelperElement';
import {sanitize} from '../api/selectors';



/**
 *	@var {string} description - Tool description.
 *	@var {string} url - Tool URL.
 *	@var {string} selector - Selector.
 *	@var {string} childrenSelector - Children selector.
 *	@var {array} attributes - Children attributes to show.
 *	@var {bool} showEmpty - Show the tag even if it is empty
 *		(i.e. it has neither content nor attributes.
 *	@var {bool} showName - Show tag name.
 *	@var {bool} showMissingAttributes - Show requested attributes
 *		that are not set on the element.
 *	@var {bool} showContent - Show text content.
 */
export const defaults = {
	selector: '',
	childrenSelector: '',
	attributes: [],
	showEmpty: false,
	showName: true,
	showMissingAttributes: false,
	showContent: false
};

/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 *	@param {object} options - Options.
 */
export const describe = (intl, {
	selector,
	childrenSelector,
	attributes,
	showEmpty,
	showName,
	showMissingAttributes,
	showContent
} = defaults) =>
	intl.formatHTMLMessage({
		id: 'Helper.showChildElements'
	}, {
		selector: sanitize(selector),
		childrenSelector: sanitize(childrenSelector),
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
 *	@param {object} options - Options.
 */
export const apply = (id, {selector, childrenSelector, ...options} = defaults) =>
	$(selector).each((i, element) => {
		const $element = $(element);

		$element
			.find(childrenSelector)
			.each((j, child) => {
				const html = serializeElement($(child), options);

				if (html) {
					showCodeNearElement(
						$element,
						$('<code />', {
							class: `${id} rgaaExt-Helper rgaaExt-ShowChildElementsHelper`,
							html
						})
					);
				}
			});
	});

/**
 *	Hides children of particular elements.
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	hideHelperElement(`.${id}`);
