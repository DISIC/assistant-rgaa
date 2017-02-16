import {property, get, fromPairs, upperFirst} from 'lodash';
import {getIds as getTestIds} from './tests';



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
export const isPending = property('imports.pending');

/**
 *
 */
export const isValid = (state) =>
	state.imports.content !== null && !state.imports.errors.length;

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
