/**
 *
 */
export const FETCH_THEME = 'panel/reference/FETCH';
export const SET_CURRENT_THEME = 'panel/reference/SET_CURRENT_THEME';
export const SET_CURRENT_CRITERION = 'panel/reference/SET_CURRENT_CRITERION';
export const ENABLE_TEST = 'panel/reference/ENABLE_TEST';
export const DISABLE_TEST = 'panel/reference/DISABLE_TEST';



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
