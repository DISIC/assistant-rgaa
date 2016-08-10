import {property, get, groupBy, filter, map, each, flatten, fromPairs} from 'lodash';
import {NON_APPLICABLE} from '../api/imports';



/**
 *
 */
export const isModalOpen = property('imports.modal.open');

/**
 *
 */
export const getErrors = property('imports.errors');

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
const rawInactiveCriteria = (state) =>
	filter(get(state.imports, 'content.criteres', []), ['resultat', NON_APPLICABLE]);

/**
 *
 */
export const getInactiveCriterionIdsByTheme = (state) => {
	const fullCriteria = groupBy(rawInactiveCriteria(state), 'thematiqueId');
	return each(fullCriteria, (criteria, themeId) => {
		fullCriteria[themeId] = map(criteria, 'id');
	});
};

/**
 *
 */
export const getInactiveCriterionIds = (state) =>
	map(rawInactiveCriteria(state), 'id');

/**
 *
 */
const rawTests = (state) =>
	flatten(map(get(state.imports, 'content.criteres', []), 'tests'));

/*
 *
 */
export const getTestResults = (state) => {
	const allTests = rawTests(state);
	return fromPairs(allTests.map(({id, resultat}) => [id, resultat]));
};

/**
 * check if the current import is valid
 *
 * returns null is there is no current import / bool otherwise
 */
export const isValid = (state) =>
	state.imports.content === null && state.imports.errors === ''
		? null
		: state.imports.content !== null && state.imports.errors === '';
