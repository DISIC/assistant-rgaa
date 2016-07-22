import toArray from './toArray';



/**
 *
 */
const highlight = (selector) =>
	toArray(document.querySelectorAll(selector))
		.forEach((element) =>
			element.classList.add()
		);

/**
 *
 */
export const apply = ({document}, selector) =>
	toArray(document.querySelectorAll(selector))
		.forEach((element) =>
			element.classList.add()
		);

/**
 *
 */
export const revert = ({document}) =>
	toggleStylesheets(
		toArray(context.document.styleSheets),
		true
	);
