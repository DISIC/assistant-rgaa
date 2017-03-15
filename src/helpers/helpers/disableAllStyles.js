import toggleStyleSheets from '../api/toggleStyleSheets';
import toggleInlineStyles from '../api/toggleInlineStyles';



/**
 *	Describes the helper.
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
	toggleInlineStyles(false);
};

/**
 *	Enable all style sheets that were previously disabled using
 *	apply().
 */
export const revert = () => {
	toggleStyleSheets(true);
	toggleInlineStyles(true);
};
