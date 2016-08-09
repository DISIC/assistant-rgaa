import {toArray} from 'lodash';



/**
 *	Toggles all style sheets in the page.
 *
 *	@param {boolean} toggled - Whether or not to enable styles.
 */
const toggleStyleSheets = (toggled) =>
	toArray(document.styleSheets)
		.forEach((stylesheet) => (
			// eslint-disable-next-line no-param-reassign
			stylesheet.disabled = !toggled
		));



/**
 *	Describes the helper.
 */
export const describe = () =>
	'Désactive tous les styles de la page.';

/**
 *	Disable all style sheets in the page.
 */
export const apply = () =>
	toggleStyleSheets(false);

/**
 *	Enable all style sheets that were previously disabled using
 *	apply().
 */
export const revert = () =>
	toggleStyleSheets(true);
