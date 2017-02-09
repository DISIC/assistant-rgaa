import {includes, get, property, map, filter} from 'lodash';



/**
 *
 */
export const getAll = property('criteria.list');

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

/**
 *
 */
export const isOpen = (state, criterionId) =>
	includes(get(state, 'criteria.opened', []), criterionId);
