import toggleStyleSheets from '../api/toggleStyleSheets';
import {muteAttribute, restoreAttribute} from '../api/muteAttributes';



/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 */
export const describe = (intl) =>
	intl.formatHTMLMessage({
		id: 'Helper.disableAllStyles'
	});

/**
 *	Disable all style sheets in the page.
 */
export const apply = () => {
	toggleStyleSheets(false);
	muteAttribute('style');
};

/**
 *	Enable all style sheets that were previously disabled using
 *	apply().
 */
export const revert = () => {
	toggleStyleSheets(true);
	restoreAttribute('style');
};
