/**
 *
 */
export const FETCH_THEME = 'common/reference/FETCH';
export const SET_REFERENCE = 'common/reference/SET_REFERENCE';
export const SET_REFERENCE_VERSION = 'common/reference/SET_REFERENCE_VERSION';
export const SET_CURRENT_THEME = 'common/reference/SET_CURRENT_THEME';
export const SET_CURRENT_CRITERION = 'common/reference/SET_CURRENT_CRITERION';
export const ENABLE_TEST = 'common/reference/ENABLE_TEST';
export const DISABLE_TEST = 'common/reference/DISABLE_TEST';
export const SET_NON_APPLICABLE_THEMES = 'common/reference/SET_NON_APPLICABLE_THEMES';
export const SET_NON_APPLICABLE_CRITERIA = 'common/reference/SET_NON_APPLICABLE_CRITERIA';
export const SET_TESTS_RESULTS = 'common/reference/SET_TESTS_RESULTS';



/**
 *
 */
export const fetchTheme = (id) => ({
	type: FETCH_THEME,
	payload: {
		id
	}
});

/**
 *
 */
export const setReferenceVersion = (version) => ({
	type: SET_REFERENCE_VERSION,
	payload: {
		version
	}
});

/**
 *
 */
export const setReference = (data) => ({
	type: SET_REFERENCE,
	payload: {
		data
	}
});

/**
 *
 */
export const setCurrentTheme = (data) => ({
	type: SET_CURRENT_THEME,
	payload: {
		theme: data
	}
});

/**
 *
 */
export const setCurrentCriterion = (data) => ({
	type: SET_CURRENT_CRITERION,
	payload: {
		criterion: data
	}
});

/**
 *
 */
export const enableTest = (id) => ({
	type: ENABLE_TEST,
	payload: {
		id
	}
});


/**
 *
 */
export const disableTest = (id) => ({
	type: DISABLE_TEST,
	payload: {
		id
	}
});

/**
 *
 */
export const setNonApplicableThemes = (themeIds) => ({
	type: SET_NON_APPLICABLE_THEMES,
	payload: {
		ids: themeIds
	}
});

/**
 *
 */
export const setNonApplicableCriteria = (criterionIds) => ({
	type: SET_NON_APPLICABLE_CRITERIA,
	payload: {
		ids: criterionIds
	}
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
