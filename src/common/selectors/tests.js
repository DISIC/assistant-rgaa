import {includes, property, filter} from 'lodash';
import {getAllTests} from './reference';



/**
 *
 */
export const getEnabledIds = property('tests.enabled');

/**
 *
 */
export const getEnabled = (state) => {
	const tests = getAllTests(state);
	const enabledIds = getEnabledIds(state);
	return filter(tests, ({id}) =>
		includes(enabledIds, id)
	);
};

/**
 *
 */
export const isEnabled = (state, id) =>
	includes(getEnabledIds(state), id);
