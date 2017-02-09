import {get, property, filter, map} from 'lodash';



/**
 *
 */
export const getAll = property('tests.list');

/**
 *
 */
export const getOne = (state, id) =>
	get(getAll(state), id);

/**
 *
 */
export const isEnabled = (state, id) =>
	get(getAll(state), [id, 'enabled'], false);

/**
 *
 */
export const getEnabled = (state) =>
	filter(getAll(state), 'enabled');

/**
 *
 */
export const getIds = (state) =>
	map(getAll(state), 'id');

/**
 *
 */
export const getAllByCriterion = (state, criterionId) =>
	filter(getAll(state), ['criterionId', criterionId]);
