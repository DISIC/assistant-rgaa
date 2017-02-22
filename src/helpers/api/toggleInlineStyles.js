import $ from 'jquery';



/**
 *	Toggles all inline styles in the page.
 *
 *	@param {boolean} toggled - Whether or not to enable styles.
 */
export default function toggleInlineStyles(toggled) {
	const from = toggled ? 'data-rgaa-ext-style' : 'style';
	const to = toggled ? 'style' : 'data-rgaa-ext-style';
	const selector = `[${from}]:not([class^="rgaaExt"])`;

	$(selector).each((i, element) => {
		const $element = $(element);

		$element.attr(to, $element.attr(from));
		$element.removeAttr(from);
	});
}
