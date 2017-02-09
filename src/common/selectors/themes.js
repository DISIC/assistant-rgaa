import {get, property, mapValues} from 'lodash';



/**
 *
 */
export const getAll = property('themes.list');

/**
 *
 */
export const getCriteriaIdsByTheme = (state) =>
	mapValues(getAll(state), 'id');

/**
 *
 */
export const isMenuOpen = (state) =>
	!!get(state, 'themes.menuIsOpen');
