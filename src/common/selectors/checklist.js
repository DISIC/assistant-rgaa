import {get, every, partial} from 'lodash';



/**
 *
 */
export const isTestDone = (state, id) =>
	get(state, ['checklist', id], false);

/**
 *
 */
export const areAllTestsDone = (state, ids) =>
	every(ids, partial(isTestDone, state));
