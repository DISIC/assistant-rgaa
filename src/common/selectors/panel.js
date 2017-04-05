import {property, get} from 'lodash';



/**
 *
 */
export const getPosition = property('panel.position');

/**
 *
 */
export const getPageTitle = (state) =>
	get(state, 'panel.pageInfo.title', null);

/**
 *
 */
export const getPageUrl = (state) =>
	get(state, 'panel.pageInfo.url', null);

/**
 *
 */
export const isFolded = (state) =>
	get(state, 'panel.folded', null);
