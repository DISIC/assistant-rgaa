import $ from 'jquery';
import showChildren from '../api/showChildren';



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
