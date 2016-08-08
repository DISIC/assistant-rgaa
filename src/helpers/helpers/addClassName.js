import $ from 'jquery';



/**
 *	Describes the helper.
 *
 *	@param {string} selector - Selector.
 *	@param {string} className - Class name.
 */
export const describe = (selector, className) => `
	Ajoute une classe <code>${className}</code>
	sur les éléments <code>${selector}</code>.
`;

/**
 *	Adds a custom class name to each element matched by the
 *	given selector.
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} className - Class name.
 */
export const apply = (id, selector, className) =>
	$(selector).addClass(className);

/**
 *	Removes class names that were previously disabled using
 *	apply().
 *
 *	@param {string} id - UUID.
 *	@param {string} selector - Selector.
 *	@param {string} className - Class name.
 */
export const revert = (id, selector, className) =>
	$(selector).removeClass(className);
