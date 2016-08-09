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
const linkIds = (name, value) =>
	LINK_ATTRIBUTES.includes(name)
		? chain(value)
			.split(/\s+/)
			.map((id) => `<a href="#${id}">#${id}</a>`)
			.join(' ')
			.value()
		: value;

/**
 *
 */
export const serializeAttribute = (element, name, showMissing) => {
	const value = element.attr(name);
	let content = '';

	if (isString(value)) {
		content = `<span class="rgaaExt-Attribute-name">${name}</span>`
			+ `="<span class="rgaaExt-Attribute-value">${linkIds(name, value)}</span>"`;
	} else if (showMissing) {
		content = `<span class="rgaaExt-Attribute-missing">${name}</span>`;
	}

	return `<span class="rgaaExt-Attribute">${content}</span>`;
};

/**
 *	Shows a box containing an attribute's name and value on
 *	the given element.
 *
 *	@param {string} id - UUID.
 *	@param {$} element - Element.
 *	@param {string} attribute - Attribute name.
 *	@param {boolean} showMissing - Whether or not to show
 *		the attribute if it is not set.
 */
export const showAttribute = (id, element, attribute, showMissing) => {
	const serialized = serializeAttribute(element, attribute, showMissing);

	if (serialized) {
		$(element).after(
			$('<code />', {
				class: `${id} rgaaExt-Helper rgaaExt-ShowAttributeHelper`,
				html: serialized
			})
		);
	}
};



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
