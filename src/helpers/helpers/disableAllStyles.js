import {toArray} from 'lodash';



/**
 *
 */
const toggleStyleSheets = (toggled) =>
	toArray(document.styleSheets)
		.forEach((stylesheet) => (
			// eslint-disable-next-line no-param-reassign
			stylesheet.disabled = !toggled
		));



/**
 *
 */
export const apply = () =>
	toggleStyleSheets(false);

/**
 *
 */
export const revert = () =>
	toggleStyleSheets(true);
