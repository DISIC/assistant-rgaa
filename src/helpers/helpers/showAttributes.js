import $ from 'jquery';
import {showAttribute} from './showAttribute';



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
