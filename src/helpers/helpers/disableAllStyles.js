import toggleStyleSheets from '../api/toggleStyleSheets';



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
