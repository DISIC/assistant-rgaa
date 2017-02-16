import $ from 'jquery';
import serializeAttributes from '../api/serializeAttributes';
import showCodeNearElement from '../api/showCodeNearElement';



/**
 *	Describes the helper.
 */
export const describe = (selector, attributes = []) => `
	Affiche les éléments <code>${selector}</code>,
	et leurs attributs <code>${attributes.join(', ')}</code>.
`;

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
export const apply = (id, selector, attributes = [], {
	showEmpty = false,
	showName = true,
	showMissingAttributes = false,
	showContent = false
} = {}) =>
	$(selector).each((i, element) => {
		const $element = $(element);

		const name = showName
			? `<span class="rgaaExt-Element-name">${element.nodeName.toLowerCase()}</span>`
			: '';

		const serializedAttributes = serializeAttributes(
			$element,
			attributes,
			showMissingAttributes
		);

		const content = showContent
			? `<span class="rgaaExt-Element-content">${element.textContent}</span>`
			: '';

		if (!showEmpty && !serializedAttributes && !content) {
			return;
		}

		let html = `<span class="rgaaExt-Element">&lt;${name}`;

		if (serializedAttributes) {
			html += ` ${serializedAttributes}`;
		}

		if (content) {
			html += `&gt>${content}&lt;/${name}&gt;`;
		} else {
			html += ' /&gt;</span>';
		}

		showCodeNearElement(
			$element,
			$('<code />', {
				class: `${id} rgaaExt-Helper rgaaExt-ShowElementHelper`,
				html
			})
		);
	});

/**
 *	Hides children of particular elements.
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
