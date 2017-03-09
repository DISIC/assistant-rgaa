import {mapValues, property} from 'lodash';



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
export const getCriteriaIdsByTheme = (state) =>
	mapValues(getAllThemes(state), 'id');
