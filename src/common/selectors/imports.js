import {
	property, map, flatten, difference, intersection, eq,
	includes, get, groupBy, filter, each, fromPairs, isEmpty
} from 'lodash';
import fp from 'lodash/fp';
import {NON_APPLICABLE} from '../api/imports';
import * as themesSelectors from './themes';
import * as criteriaSelectors from './criteria';
import * as testsSelectors from './tests';



/**
 *
 */
export const getContent = property('imports.content');

/**
 *
 */
export const getVersion = (state) =>
	get(state.imports, 'content.version-referentiel', null);

/**
 *
 */
export const getErrors = property('imports.errors');

/**
 *
 */
export const getInactiveThemeIds = property('imports.inactiveThemeIds');

/**
 *
 */
export const getInactiveCriterionIds = property('imports.inactiveCriterionIds');

/**
 *
 */
export const getTestResults = property('imports.testResults');

/**
 *
 */
export const getOneTestResult = (state, id) =>
	state.imports.testResults[id] || '';

/**
 *
 */
export const isImportActive = (state) =>
	getInactiveCriterionIds(state).length > 0
	|| getInactiveThemeIds(state).length > 0
	|| !isEmpty(getTestResults(state));

/**
 *
 */
export const isPending = property('imports.pending');

/*
 *
 */
export const isThemeInactive = (state, id) =>
	includes(getInactiveThemeIds(state), id);

/*
 *
 */
export const isCriterionInactive = (state, id) =>
	includes(getInactiveCriterionIds(state), id);

/**
 * check if the current import is valid
 */
export const isValid = (state) =>
	state.imports.content !== null && state.imports.errors === '';

/**
 *
 */
export const isModalOpen = property('imports.modal.open');

/**
 *
 */
const rawInactiveCriteria = (state) =>
	filter(get(state.imports, 'content.criteres', []), ['resultat', NON_APPLICABLE]);

/**
 *
 */
const rawTests = (state) =>
	flatten(map(get(state.imports, 'content.criteres', []), 'tests'));

/*
 *
 */
export const findInactiveCriterionIds = (state) => {
	const importIds = map(rawInactiveCriteria(state), 'id');
	const refIds = criteriaSelectors.getIds(state);
	return intersection(importIds, refIds);
};

/*
 *
 */
export const findTestResults = (state) => {
	const allTests = rawTests(state);
	const importResults = fromPairs(allTests.map(({id, resultat}) => [id, resultat]));
	const testIds = testsSelectors.getIds(state);
	const referenceTestResults = {};
	testIds.forEach(id => {
		if (importResults[id]) {
			referenceTestResults[id] = importResults[id];
		}
	});
	return referenceTestResults;
};

/**
 *
 */
export const findInactiveCriterionIdsByTheme = (state) => {
	const fullCriteria = groupBy(rawInactiveCriteria(state), 'thematiqueId');
	return each(fullCriteria, (criteria, themeId) => {
		fullCriteria[themeId] = map(criteria, 'id');
	});
};

/*
 *
 */
export const findInactiveThemeIds = (state) => {
	const importInactiveCriteriaByTheme = findInactiveCriterionIdsByTheme(state);
	const referenceCriteriaByTheme = themesSelectors.getCriteriaIdsByTheme(state);

	return fp.flow(
		fp.map((criteria, themeId) => {
			if (!referenceCriteriaByTheme[themeId]) {
				return false;
			}
			if (difference(referenceCriteriaByTheme[themeId], criteria).length === 0) {
				return themeId;
			}
			return false;
		}),
		fp.uniqBy(eq),
		fp.filter(Boolean)
	)(importInactiveCriteriaByTheme);
};
