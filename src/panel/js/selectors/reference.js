import {property} from 'lodash';



/**
 *
 */
export const getThemes = property('reference.data.themes');

/**
 *
 */
export const getCurrentTheme = property('reference.theme');

/**
 *
 */
export const isTestApplied = (state, testId) => !!state.reference.tests[testId];
