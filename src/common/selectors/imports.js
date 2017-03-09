import {
	property, isEmpty, get, fromPairs, upperFirst, mapValues, groupBy, countBy, map
} from 'lodash';
import {getTestIds} from './reference';



/**
 *
 */
export const getContent = property('imports.content');

/**
 *
 */
export const getConfig = property('imports.config');

/**
 *
 */
export const getVersion = (state) =>
	get(getContent(state), '[0][\'Version référentiel\']', null);

/**
 *
 */
export const getErrors = property('imports.errors');

/**
 *
 */
export const getHumanReadableErrors = (state) =>
	getErrors(state).map(({message, row}) => (
		row
			? `Ligne ${row} : ${message}.`
			: `${upperFirst(message)}.`
	));

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
export const getOneCriterionResults = (state, id) =>
	state.imports.criteriaResults[id] || null;

/**
 *
 */
export const isPending = property('imports.pending');

/**
 *
 */
export const isValid = (state) =>
	state.imports.content !== null && !state.imports.errors.length;

/**
 *
 */
export const isImportActive = (state) =>
	!isEmpty(getTestResults(state));

/*
 *
 */
export const findCriteriaResults = (state) => {
	const allTests = getContent(state);
	const resultsByCriterion = mapValues(groupBy(allTests, 'Critère'), (tests) => (
		countBy(map(tests, (test) => test.Statut.toLowerCase()))
	));
	return resultsByCriterion;
};

/*
 *
 */
export const findTestResults = (state) => {
	const allTests = getContent(state);
	const importResults = fromPairs(allTests.map(({Test, Statut}) => [Test, Statut]));
	const testIds = getTestIds(state);
	const referenceTestResults = {};
	testIds.forEach(id => {
		if (importResults[id]) {
			referenceTestResults[id] = importResults[id].toLowerCase();
		}
	});
	return referenceTestResults;
};
