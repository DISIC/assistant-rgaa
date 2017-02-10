import $ from 'jquery';
import showAttribute from '../api/showAttribute';
import showTagApi from '../api/showTag';



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
export const apply = (id, selector, attributes, {showMissing = false, showTag = false} = {}) =>
	$(selector).each((i, element) => {
		attributes.forEach((attribute) =>
			showAttribute(id, $(element), attribute, showMissing)
		);
		if (showTag) {
			showTagApi(id, $(element));
		}
	});

/**
 *
 */
export const revert = (id) =>
	$(`.${id}`).remove();
