import serializeAttributes from './serializeAttributes';



/**
 *	@see http://stackoverflow.com/a/30930653
 */
const escape = (html) =>
	document
		.createElement('div')
		.appendChild(document.createTextNode(html))
		.parentNode
		.innerHTML;

/**
 *	Returns inner HTML of the given element, without reserved
 *	extension's elements.
 */
const innerHtml = (element) => {
	const copy = element.clone();
	copy.find('[class*=rgaaExt]').remove();
	return escape(copy.html());
};

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
		? `<pre class="rgaaExt-Element-content">${innerHtml(element)}</pre>`
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
