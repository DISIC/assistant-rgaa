import {get} from 'lodash';



/**
 *
 */
export const getHelpersByTest = (state, id) =>
	get(state, ['helpers', id], []);
