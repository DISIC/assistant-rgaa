import $ from 'jquery';
import {showAttribute} from './showAttribute';



/**
 *	Describes the helper.
 */
export const describe = (selector, attributes) => `
	Affiche les attributs <code>${attributes.join(', ')}</code>
	des éléments <code>${selector}</code>.
`;

/**
 *
 */
export const apply = (id, selector, attributes, {showMissing = false} = {}) =>
	$(selector).each((i, element) => {
		attributes.forEach((attribute) =>
			showAttribute(id, $(element), attribute, showMissing)
		);
	});

/**
 *
 */
export const revert = (id) =>
	$(`.${id}`).remove();
