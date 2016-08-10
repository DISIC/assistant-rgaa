import {chain, property, map, flatten, difference, values, intersection} from 'lodash';
import {
	getInactiveCriterionIdsByTheme,
	getInactiveCriterionIds as getImportInactiveCriterionIds,
	getTestResults as getImportTestResults
} from './imports';



/**
 *
 */
export const getThemes = property('reference.data.themes');

/**
 *
 */
export const getCriterionIdsByTheme = (state) => {
	const data = {};
	state.reference.data.themes.forEach(({id, criteria}) => {
		data[id] = map(criteria, 'id');
	});
	return data;
};

/**
 *
 */
export const getCriterionIds = (state) => {
	const byTheme = getCriterionIdsByTheme(state);
	return flatten(values(byTheme));
};

/**
 *
 */
export const getTestIds = (state) => {
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
export const getCurrent = property('reference.data');

/**
 *
 */
export const isTestApplied = (state, testId) => !!state.reference.tests[testId];

/*
 *
 */
export const getInactiveThemeIds = (state) => {
	const importInactiveCriteriaByTheme = getInactiveCriterionIdsByTheme(state);
	const referenceCriteriaByTheme = getCriterionIdsByTheme(state);
	return chain(importInactiveCriteriaByTheme)
		.map((criteria, themeId) => {
			if (!referenceCriteriaByTheme[themeId]) {
				return false;
			}
			if (difference(referenceCriteriaByTheme[themeId], criteria).length === 0) {
				return themeId;
			}
			return false;
		})
		.uniq()
		.filter()
		.value();
};

/*
 *
 */
export const getInactiveCriterionIds = (state) =>
	intersection(getImportInactiveCriterionIds(state), getCriterionIds(state));

/*
 *
 */
export const getTestResults = (state) => {
	const importTestResults = getImportTestResults(state);
	const testIds = getTestIds(state);
	const referenceTestResults = {};
	testIds.forEach(id => {
		if (importTestResults[id]) {
			referenceTestResults[id] = importTestResults[id];
		}
	});
	return referenceTestResults;
};
