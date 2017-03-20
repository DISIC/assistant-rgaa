import $ from 'jquery';



/**
 *	Describes the helper.
 */
export const describe = (intl, description) =>
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
 *	@param {string} style - CSS code.
 */
export const apply = (id, description, style) =>
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
