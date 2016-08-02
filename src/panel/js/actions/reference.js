/**
 *
 */
export const FETCH_THEME = 'panel/reference/FETCH';
export const SET_CURRENT_THEME = 'panel/reference/SET_CURRENT_THEME';
export const SET_CURRENT_CRITERION = 'panel/reference/SET_CURRENT_CRITERION';



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
