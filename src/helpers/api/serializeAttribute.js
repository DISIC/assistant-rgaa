import {isString} from 'lodash';
import {flow, split, flatMap, join} from 'lodash/fp';



/**
 *	Attributes that contain a list of ids.
 */
const linkAttributes = [
	'for',
	'aria-labelledby',
	'aria-describedby'
];

/**
 *	Transforms the given id into a link if possible, otherwise just return the id
 */
const linkId = (id) => {
	let elements;
	let error = false;

	try {
		elements = document.querySelectorAll(`#${id}`);
	} catch (e) {
		error = true;
	}

	// return a simple text if we can't link to the given id
	if (error || elements.length === 0) {
		return id;
	}

	const count = elements.length;
	const countString = (count !== 1)
		? ` (${count})`
		: '';

	return `<a class="rgaaExt-Attribute-link" href="#${id}">${id}${countString}</a>`;
};

/**
 *	Makes a anchor to each of the linked ids.
 *
 *	@param {string} value - Attribute value.
 *	@return {string} - Attribute value containing anchors if needed.
 */
const linkIds = flow(
	split(/\s+/),
	flatMap(linkId),
	join(' ')
);

/**
 *
 */
export default function serializeAttribute(element, name, showMissing) {
	const value = element.attr(name);

	if (isString(value)) {
		const linkedIds = linkAttributes.includes(name)
			? linkIds(value)
			: value;

		return '<span class="rgaaExt-Attribute">'
				+ `<span class="rgaaExt-Attribute-name">${name}</span>`
				+ `="<span class="rgaaExt-Attribute-value">${linkedIds}</span>"`
			+ '</span>';
	}

	if (showMissing) {
		return '<span class="rgaaExt-Attribute">'
				+ '<span class="rgaaExt-Attribute-missing">'
					+ `${name} <span class="rgaaExt-ScreenReaderOnly">absent</span>`
				+ '</span>'
			+ '</span>';
	}

	return null;
}
