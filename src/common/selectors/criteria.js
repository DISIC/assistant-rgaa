import {get, property, map, filter} from 'lodash';



/**
 *
 */
export const getAll = property('criteria.list');

/**
 *
 */
export const getCurrent = (state) => {
	const id = get(state, 'criteria.current');
	return id ? get(getAll(state), id) : null;
};

/**
 *
 */
export const getIds = (state) =>
	map(getAll(state), 'id');

/**
 *
 */
export const getAllByTheme = (state, themeId) =>
	filter(getAll(state), ['themeId', themeId]);
