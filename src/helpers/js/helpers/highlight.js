import {inject, remove} from './effects/style';



/**
 *
 */
export const apply = ({document}, {id, selector, width = '5px', color = 'red'}) =>
	inject(document, id, `
		${selector} {
			border: ${width} solid ${color};
		}
	`);

/**
 *
 */
export const revert = ({document}, {id}) =>
	remove(document, id);
