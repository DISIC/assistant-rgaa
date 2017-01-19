import {get, property, mapValues} from 'lodash';



/**
 *
 */
export const getAll = property('themes.list');

/**
 *
 */
export const getCurrent = (state) => {
	const id = get(state, 'themes.current');
	return id ? get(getAll(state), id) : null;
};

/**
 *
 */
export const getCriteriaIdsByTheme = (state) =>
	mapValues(getAll(state), 'id');
