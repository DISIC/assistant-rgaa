import $ from 'jquery';



/**
 *	@var {string} description - Description.
 *	@var {string} style - CSS code.
 */
export const defaults = {
	description: '',
	style: ''
};

/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 *	@param {object} options - Options.
 */
export const describe = (intl, {description} = defaults) =>
	intl.formatHTMLMessage({
		id: 'Helper.style'
	}, {
		description,
		hasDescription: !!description
	});

/**
 *	Injects a custom style block in the <head />.
 *
 *	@param {string} id - UUID.
 *	@param {object} options - Options.
 */
export const apply = (id, {style} = defaults) =>
	$('head').append(
		$('<style />', {
			id,
			type: 'text/css',
			text: style
		})
	);

/**
 *	Removes style blocks previously added using apply().
 *
 *	@param {string} id - UUID.
 */
export const revert = (id) =>
	$(`#${id}`).remove();
