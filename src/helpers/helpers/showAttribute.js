import $ from 'jquery';
import {isString, chain} from 'lodash';



/**
 *	Attributes that contain a list of ids.
 */
const LINK_ATTRIBUTES = [
	'for',
	'aria-labelledby'
];



/**
 *	If an attribute with the given name contains a list of id,
 *	makes a anchor to each of the linked ids.
 *
 *	@param {string} name - Attribute name.
 *	@param {string} value - Attribute value.
 *	@return {string} - Attribute value containing anchors if needed.
 */
const linkIds = (name, value) => {
	if (LINK_ATTRIBUTES.includes(name)) {
		return chain(value)
			.split(/\s+/)
			.map((id) => `<a href="#${id}">#${id}</a>`)
			.join(' ')
			.value();
	}

	return value;
};

/**
 *	Builds HTML code to render an attribute's name and value.
 *
 *	@param {string} name - Attribute name.
 *	@param {string} value - Attribute value.
 *	@return {string} - HTML.
 */
const serialize = (name, value) => {
	if (isString(value)) {
		return `<span class="rgaaExt-ShowAttributeHelper-name">${name}</span>`
			+ `="<span class="rgaaExt-ShowAttributeHelper-value">${linkIds(name, value)}</span>"`;
	}

	return `<span class="rgaaExt-ShowAttributeHelper-missing">${name}</span>`;
};

/**
 *	Shows a box containing an attribute's name and value on
 *	the given element.
 *
 *	@param {string} id - UUID.
 *	@param {$} element - Element.
 *	@param {string} name - Attribute name.
 *	@param {boolean} showMissing - Whether or not to show
 *		the attribute if it is not set.
 */
export const showAttribute = (id, element, name, showMissing) => {
	const value = element.attr(name);

	if (!showMissing && !isString(value)) {
		return;
	}

	$(element).after(
		$('<span />', {
			class: `${id} rgaaExt-Helper rgaaExt-ShowAttributeHelper`,
			html: serialize(name, value)
		})
	);
};

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
 */
export const apply = (id, selector, attribute, {showMissing = false} = {}) =>
	$(selector).each((i, element) =>
		showAttribute(id, $(element), attribute, showMissing)
	);

/**
 *	Removes all boxes previously added using apply().
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
