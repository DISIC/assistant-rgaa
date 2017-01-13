import {get, every} from 'lodash';



/**
 *
 */
export const isTestDone = (state, id) =>
	get(state, ['checklist', id], false);

/**
 *
 */
export const areAllTestsDone = (state, tests) =>
	every(tests, ({id}) =>
		isTestDone(state, id)
	);
