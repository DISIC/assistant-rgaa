import {toArray} from 'lodash';
import toggleClassName from './effects/toggleClassName';



/**
 *
 */
export const apply = ({document}, {selector, className}) =>
	toggleClassName(
		toArray(document.querySelectorAll(selector)),
		className,
		true
	);

/**
 *
 */
export const revert = ({document}, {selector, className}) =>
	toggleClassName(
		toArray(document.querySelectorAll(selector)),
		className,
		false
	);
