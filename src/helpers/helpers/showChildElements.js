import $ from 'jquery';
import {cond, list} from '../api/description';
import serializeElement from '../api/serializeElement';
import showCodeNearElement from '../api/showCodeNearElement';
import {sanitize} from '../api/selectors';



/**
 *	Describes the helper.
 */
export const describe = (selector, childrenSelector, attributes = [], {
	showEmpty = false,
	showName = true,
	showMissingAttributes = false,
	showContent = false
} = {}) =>
	list(
		`Pour chaque élément <code>${sanitize(selector)}</code>,
		affiche les éléments enfants <code>${sanitize(childrenSelector)}</code>
		${cond(showEmpty, '(y compris si ils sont vides)')}`,
		cond(showName, 'leur type'),
		cond(attributes.length,
			`leurs attributs <code>${attributes.join(', ')}</code>
			${cond(showMissingAttributes, '(y compris si ils ne sont pas définis)')}`
		),
		cond(showContent, 'leur contenu')
	);

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
			.each((j, child) => {
				const html = serializeElement($(child), attributes, options);

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
