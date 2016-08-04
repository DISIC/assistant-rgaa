import $ from 'jquery';



/**
 *	Injects a custom style block in the <head />.
 *
 *	@param {string} id - UUID.
 *	@param {string} style - CSS code.
 */
export const apply = (id, style) =>
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
