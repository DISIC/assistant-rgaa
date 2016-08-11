import {get} from 'lodash';



/**
 *
 */
export const getHelpersByTest = (state, id) =>
	get(state, ['helpers', id], []);

/**
 *
 */
export const testHasHelpers = (state, id) =>
	(getHelpersByTest(state, id).length > 0);
