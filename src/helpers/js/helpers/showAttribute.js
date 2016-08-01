import {inject, remove} from './effects/style';



/**
 *
 */
export const apply = ({document}, {id, selector, attribute, color = 'red'}) =>
	inject(document, id, `
		${selector}:after {
			content: "${attribute}="attr(${attribute})"";
			color: ${color};
			font-weight: bold;
		}
	`);

/**
 *
 */
export const revert = ({document}, {id}) =>
	remove(document, id);
