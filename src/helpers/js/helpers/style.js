import $ from 'jquery';



/**
 *
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
 *
 */
export const revert = (id) =>
	$(`#${id}`).remove();
