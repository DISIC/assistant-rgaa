import {includes, property, filter} from 'lodash';
import {getAllTests, getAllTestsByCriterion} from './reference';



/**
 *
 */
export const getEnabledIds = property('tests.enabled');

const filterEnabledTests = (state, tests) => {
	const enabledIds = getEnabledIds(state);
	return filter(tests, ({id}) =>
		includes(enabledIds, id)
	);
};

/**
 *
 */
export const getEnabled = (state) =>
	filterEnabledTests(state, getAllTests(state));

/**
 *
 */
export const getEnabledForCriterion = (state, criterionId) =>
	filterEnabledTests(state, getAllTestsByCriterion(state, criterionId));

/**
 *
 */
export const isEnabled = (state, id) =>
	includes(getEnabledIds(state), id);
