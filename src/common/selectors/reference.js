import {property, map, flatten, values} from 'lodash';



/**
 *
 */
export const getCurrent = property('reference.data');

/**
 *
 */
export const getThemes = property('reference.data.themes');

/**
 *
 */
export const getVersion = property('reference.data.version');

/**
 *
 */
export const getCurrentTheme = property('reference.theme');

/**
 *
 */
export const getCurrentCriterion = property('reference.criterion');

/**
 *
 */
export const isTestApplied = (state, testId) => !!state.reference.tests[testId];

/**
 *
 */
export const findCriterionIdsByTheme = (state) => {
	const data = {};
	state.reference.data.themes.forEach(({id, criteria}) => {
		data[id] = map(criteria, 'id');
	});
	return data;
};

/**
 *
 */
export const findCriterionIds = (state) => {
	const byTheme = findCriterionIdsByTheme(state);
	return flatten(values(byTheme));
};

/**
 *
 */
export const findTestIds = (state) => {
	const themes = getThemes(state);
	const tests = [];
	themes.forEach((theme) => {
		theme.criteria.forEach((criterion) => {
			criterion.tests.forEach((test) => {
				tests.push(test.id);
			});
		});
	});
	return tests;
};
