import $ from 'jquery';



/**
 *	Appends some code next to an element, ensuring that the
 *	code is visible in the page.
 *
 *	@param {$} element - Element.
 *	@param {$} code - Code.
 */
export default function showCodeNearElement(element, code) {
	if (document.body.contains(element.get(0))) {
		element.after(code);
	} else {
		$(document.body).prepend(code);
	}
}
