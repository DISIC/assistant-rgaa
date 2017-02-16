import $ from 'jquery';
import serializeElement from '../api/serializeElement';
import showCodeNearElement from '../api/showCodeNearElement';



/**
 *	Describes the helper.
 */
export const describe = (selector, childrenSelector, attributes = []) => `
	Pour chaque élément <code>${selector}</code>,
	affiche les éléments enfants <code>${childrenSelector}</code>
	et leurs attributs <code>${attributes.join(', ')}</code>.
`;

/**
 *	Shows a DOM element.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} childrenSelector - Children selector.
 *	@param {array} attributes - Children attributes to show.
 *	@param {object} options - Options:
 *		- {bool} showEmpty - Show the tag even if it is empty
 *			(i.e. it has neither content nor attributes.
 *		- {bool} showName - Show tag name.
 *		- {bool} showMissingAttributes - Show requested attributes
 *			that are not set on the element.
 *		- {bool} showContent - Show text content.
 */
export const apply = (id, selector, childrenSelector, attributes = [], options = {}) =>
	$(selector).each((i, element) => {
		const $element = $(element);

		$element
			.find(childrenSelector)
			.each((child) => {
				const $child = $(child);
				const html = serializeElement($child, attributes, options);

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
	$(`.${id}`).remove();
