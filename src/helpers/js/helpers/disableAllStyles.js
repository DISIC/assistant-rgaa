import {toArray} from 'lodash';



/**
 *
 */
const toggleStylesheets = (styleSheets, toggled) =>
	styleSheets.forEach((stylesheet) =>
		stylesheet.disabled = !toggled
	);

/**
 *
 */
export const apply = ({document}) =>
	toggleStylesheets(
		toArray(document.styleSheets),
		false
	);

/**
 *
 */
export const revert = ({document}) =>
	toggleStylesheets(
		toArray(document.styleSheets),
		true
	);
