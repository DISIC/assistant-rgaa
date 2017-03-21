import $ from 'jquery';



/**
 * remove element matching given selector and its container if possible
 */
export default function hideHelperElement(selector) {
	const container = $(selector).closest('.rgaaExt-HelperContainer');
	$(selector).remove();
	if (!container.children().length) {
		container.remove();
	}
}
