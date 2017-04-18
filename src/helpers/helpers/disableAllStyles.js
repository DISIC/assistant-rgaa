import $ from 'jquery';
import toggleStyleSheets from '../api/toggleStyleSheets';
import {mutedAttributeSelector, muteAttribute, restoreAttribute} from '../api/muteAttributes';



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
	muteAttribute($('[style]'), 'style');
};

/**
 *	Enable all style sheets that were previously disabled using
 *	apply().
 */
export const revert = () => {
	const selector = mutedAttributeSelector('style');

	toggleStyleSheets(true);
	restoreAttribute($(selector), 'style');
};
