import {serializeAttributes} from './showAttribute';



/**
 *
 */
export default function serializeElement(element, attributes, {
	showEmpty = false,
	showName = true,
	showMissingAttributes = false,
	showContent = false
} = {}) {
	const name = showName
		? `<span class="rgaaExt-Element-name">${element.get(0).nodeName.toLowerCase()}</span>`
		: '';

	const serializedAttributes = serializeAttributes(
		element,
		attributes,
		showMissingAttributes
	);

	const content = showContent
		? `<span class="rgaaExt-Element-content">${element.get(0).textContent}</span>`
		: '';

	if (!showEmpty && !serializedAttributes && !content) {
		return '';
	}

	let html = `<span class="rgaaExt-Element">&lt;${name}`;

	if (serializedAttributes) {
		html += ` ${serializedAttributes}`;
	}

	if (content) {
		html += `&gt;${content}&lt;/${name}&gt;`;
	} else {
		html += ' /&gt;</span>';
	}

	return html;
}
