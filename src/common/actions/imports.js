/**
 *
 */
export const OPEN_MODAL = 'common/imports/OPEN_MODAL';
export const CLOSE_MODAL = 'common/imports/CLOSE_MODAL';
export const RESET = 'common/imports/RESET';
export const SET_CONTENT = 'common/imports/SET_CONTENT';
export const SET_ERRORS = 'common/imports/SET_ERRORS';
export const APPLY = 'common/imports/APPLY';



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
