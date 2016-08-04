import {apply as addClassName, revert as removeClassName} from './addClassName';



/**
 *
 */
export const apply = (id, selector) =>
	addClassName(id, selector, 'rgaa-BorderHelper');

/**
 *
 */
export const revert = (id, selector) =>
	removeClassName(id, selector, 'rgaa-BorderHelper');
