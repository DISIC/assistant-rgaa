import {property} from 'lodash';



/**
 *
 */
export const getCurrent = property('reference.data');

/**
 *
 */
export const getVersion = property('reference.data.version');

/**
 *
 */
export const isLoaded = (state) =>
	!!getVersion(state);
