/**
 *
 */
export const OPEN_MODAL = 'common/imports/OPEN_MODAL';
export const CLOSE_MODAL = 'common/imports/CLOSE_MODAL';
export const RESET_RESULTS = 'common/imports/RESET_RESULTS';
export const RESET_MODAL_CONTENT = 'common/imports/RESET_MODAL_CONTENT';
export const SET_PENDING = 'common/imports/SET_PENDING';
export const SET_CONTENT = 'common/imports/SET_CONTENT';
export const SET_ERRORS = 'common/imports/SET_ERRORS';
export const APPLY = 'common/imports/APPLY';
export const SET_NON_APPLICABLE_THEMES = 'common/imports/SET_NON_APPLICABLE_THEMES';
export const SET_NON_APPLICABLE_CRITERIA = 'common/imports/SET_NON_APPLICABLE_CRITERIA';
export const SET_TESTS_RESULTS = 'common/imports/SET_TESTS_RESULTS';


/**
 *
 */
export const openModal = () => ({
	type: OPEN_MODAL,
	payload: {}
});

/**
 *
 */
export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {}
});

/**
 *
 */
export const resetResults = () => ({
	type: RESET_RESULTS,
	payload: {}
});

/**
 *
 */
export const resetModalContent = () => ({
	type: RESET_MODAL_CONTENT,
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
