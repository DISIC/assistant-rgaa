import {map, filter, property, get} from 'lodash';



/**
 *
 */
export const getVersion = property('reference.data.version');

/**
 *
 */
export const isLoaded = (state) =>
	!!getVersion(state);

/**
 *
 */
export const getAllThemes = property('reference.themes');

/**
 *
 */
export const getAllCriteria = property('reference.criteria');

/**
 *
 */
export const getCriteriaIds = (state) =>
	map(getAllCriteria(state), 'id');

/**
 *
 */
export const getAllCriteriaByTheme = (state, themeId) =>
	filter(getAllCriteria(state), ['themeId', themeId]);

/**
 *
 */
export const getAllTests = property('reference.tests');

/**
 *
 */
export const getTestIds = (state) =>
	map(getAllTests(state), 'id');

/**
 *
 */
export const getAllTestsByCriterion = (state, criterionId) =>
	filter(getAllTests(state), ['criterionId', criterionId]);
