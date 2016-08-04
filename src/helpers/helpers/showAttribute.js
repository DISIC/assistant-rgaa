import $ from 'jquery';



/**
 *	This helper could have been implemented using a combination
 *	of :after, content, and attr() in CSS, but browsers don't
 *	support pseudo-elements on <img /> tags.
 */



/**
 *
 */
export const apply = (id, selector, attribute) =>
	$(selector).each((i, el) => {
		const element = $(el);
		const value = element.attr(attribute);

		$(element).after(
			$('<p />', {
				class: `${id} rgaaExt-Helper rgaaExt-ShowAttributeHelper`,
				text: value
					? `${attribute}="${value}"`
					: `Pas d'attribut ${attribute}`
			})
		);
	});

/**
 *
 */
export const revert = (id) =>
	$(`.${id}`).remove();
