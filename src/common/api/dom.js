import $ from 'jquery';



/**
 *
 */
export const stripTags = (html) =>
	$('<div />', {html}).text();
