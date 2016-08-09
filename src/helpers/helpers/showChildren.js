import $ from 'jquery';
import {lowerCase} from 'lodash';
import {serializeAttribute} from './showAttribute';



/**
 *
 */
const serializeElement = (element, attributes, showMissing) => {
	const name = lowerCase(element.get(0).tagName);
	const attributesString = attributes
		.map((attribute) => serializeAttribute(element, attribute, showMissing))
		.join(' ');

	return `&lt;${name} ${attributesString} /&gt;`;
};

/**
 *
 */
const showChildren = (id, element, childrenSelector, attributes, showMissing) =>
	element
		.find(childrenSelector)
		.each((i, child) =>
			element.after(
				$('<code />', {
					class: `${id} rgaaExt-Helper rgaaExt-SerializeChildrenHelper`,
					html: serializeElement($(child), attributes, showMissing)
				})
			)
		);



/**
 *	Describes the helper.
 */
export const describe = (selector, childrenSelector, attributes) => `
	Pour chaque élément <code>${selector}</code>,
	affiche les éléments enfants <code>${childrenSelector}</code>
	et leurs attributs <code>${attributes.join(', ')}</code>.
`;

/**
 *	Shows children of particular elements.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} childrenSelector - Children selector.
 *	@param {array} attributes - Children attributes to show.
 */
export const apply = (id, selector, childrenSelector, attributes, {showMissing = false} = {}) =>
	$(selector).each((i, element) =>
		showChildren(id, $(element), childrenSelector, attributes, showMissing)
	);

/**
 *	Hides children of particular elements.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 */
export const revert = (id) =>
	$(`.${id}`).remove();
