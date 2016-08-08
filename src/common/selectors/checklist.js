import {get} from 'lodash';



/**
 *
 */
export const isTestDone = (state, id) =>
	get(state, ['checklist', id], false);
