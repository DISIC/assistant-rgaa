import {property} from 'lodash';



/**
 *
 */
export const getThemes = property('reference.data.themes');

/**
 *
 */
export const getVersion = property('reference.data.version');

/**
 *
 */
export const getCurrentTheme = property('reference.theme');

/**
 *
 */
export const getCurrent = property('reference.data');

/**
 *
 */
export const isTestApplied = (state, testId) => !!state.reference.tests[testId];
