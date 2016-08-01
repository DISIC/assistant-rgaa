import {toArray} from 'lodash';
import toggleStyleSheets from './effects/toggleStyleSheets';



/**
 *
 */
export const apply = ({document}) =>
	toggleStyleSheets(
		toArray(document.styleSheets),
		false
	);

/**
 *
 */
export const revert = ({document}) =>
	toggleStyleSheets(
		toArray(document.styleSheets),
		true
	);
