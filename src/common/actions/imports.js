/**
 *
 */
export const RESET = 'common/imports/RESET';
export const SET_PENDING = 'common/imports/SET_PENDING';
export const SET_CONFIG = 'common/imports/SET_CONFIG';
export const SET_CONTENT = 'common/imports/SET_CONTENT';
export const SET_ERRORS = 'common/imports/SET_ERRORS';
export const APPLY = 'common/imports/APPLY';
export const SET_TESTS_RESULTS = 'common/imports/SET_TESTS_RESULTS';
export const SET_CRITERIA_RESULTS = 'common/imports/SET_CRITERIA_RESULTS';



/**
 *
 */
export const reset = () => ({
	type: RESET,
	payload: {}
});

/**
 *
 */
export const setContent = (content) => ({
	type: SET_CONTENT,
	payload: {
		content
	}
});

/**
 *
 */
export const setPending = (pending) => ({
	type: SET_PENDING,
	payload: {
		pending
	}
});

/**
 *
 */
export const setConfig = (name, value) => ({
	type: SET_CONFIG,
	payload: {
		name,
		value
	}
});

/**
 *
 */
export const setErrors = (errors) => ({
	type: SET_ERRORS,
	payload: {
		errors
	}
});

/**
 *
 */
export const apply = () => ({
	type: APPLY,
	payload: {}
});

/**
 *
 */
export const setTestsResults = (testResults) => ({
	type: SET_TESTS_RESULTS,
	payload: {
		data: testResults
	}
});

/**
 *
 */
export const setCriteriaResults = (criteriaResults) => ({
	type: SET_CRITERIA_RESULTS,
	payload: {
		data: criteriaResults
	}
});
