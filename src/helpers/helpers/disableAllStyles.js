import $ from 'jquery';
import toggleStyleSheets from '../api/toggleStyleSheets';
import {mutedAttributeSelector, muteAttribute, restoreAttribute} from '../api/muteAttributes';
import {apply as applyStyle, revert as revertStyle} from './style';



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
export const apply = (id) => {
	toggleStyleSheets(false);
	muteAttribute($('[style]'), 'style');
	applyStyle(id, {
		style: `
			img, svg, embed[type="image"], object[type="image"] {
				width: auto !important;
				height: auto !important;
				max-width: 400px !important;
				max-height: 400px !important;
			}
		`
	});
};

/**
 *	Enable all style sheets that were previously disabled using
 *	apply().
 */
export const revert = (id) => {
	const selector = mutedAttributeSelector('style');

	revertStyle(id);
	restoreAttribute($(selector), 'style');
	toggleStyleSheets(true);
};
