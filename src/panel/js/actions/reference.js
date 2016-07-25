/**
 *
 */
export const FETCH_THEME = 'theme/FETCH';
export const SET_CURRENT_THEME = 'theme/SET_CURRENT_THEME';
export const SET_CURRENT_CRITERION = 'theme/SET_CURRENT_CRITERION';



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
