import {isString} from 'lodash';
import {flow, split, map, join} from 'lodash/fp';



/**
 *	Attributes that contain a list of ids.
 */
const linkAttributes = [
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
	if (!linkAttributes.includes(name)) {
		return value;
	}

	return flow(
		split(/\s+/),
		map((id) => `<a href="#${id}">#${id}</a>`),
		join(' ')
	)(value);
};

/**
 *
 */
export default function serializeAttribute(element, name, showMissing) {
	const value = element.attr(name);
	let content = '';

	if (isString(value)) {
		content = `<span class="rgaaExt-Attribute-name">${name}</span>`
			+ `="<span class="rgaaExt-Attribute-value">${linkIds(name, value)}</span>"`;
	} else if (showMissing) {
		content = `<span class="rgaaExt-Attribute-missing">${name}</span>`;
	}

	return `<span class="rgaaExt-Attribute">${content}</span>`;
}
