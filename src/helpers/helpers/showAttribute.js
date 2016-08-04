import $ from 'jquery';



/**
 *	This helper could have been implemented using a combination
 *	of :after, content, and attr() in CSS, but browsers don't
 *	support pseudo-elements on <img /> tags.
 */



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
const attributeBox = (name, value) => {
	if (value === undefined) {
		return `<span class="rgaaExt-ShowAttributeHelper-missing">${name}</span>`;
	}

	return `<span class="rgaaExt-ShowAttributeHelper-name">${name}</span>`
		+ `="<span class="rgaaExt-ShowAttributeHelper-value">${linkIds(name, value)}</span>"`;
};



/**
 *	Shows a box containing an attribute's name and value on
 *	each element matched by the given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} attribute - Attribute name.
 */
export const apply = (id, selector, attribute) =>
	$(selector).each((i, el) => {
		const element = $(el);
		const value = element.attr(attribute);

		$(element).after(
			$('<p />', {
				class: `${id} rgaaExt-Helper rgaaExt-ShowAttributeHelper`,
				html: attributeBox(attribute, value)
			})
		);
	});

/**
 *
 */
export const revert = (id) =>
	$(`.${id}`).remove();
