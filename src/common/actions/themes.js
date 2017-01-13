/**
 *
 */
export const SET_ALL = 'common/themes/SET_ALL';
export const SET_CURRENT = 'common/themes/SET_CURRENT';



/**
 *
 */
export const setAll = (themes) => ({
	type: SET_ALL,
	payload: themes
});

/**
 *
 */
export const setCurrent = (id) => ({
	type: SET_CURRENT,
	payload: id
});
