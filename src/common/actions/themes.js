/**
 *
 */
export const SET_ALL = 'common/themes/SET_ALL';
export const TOGGLE_MENU = 'common/themes/TOGGLE_MENU';



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
export const toggleMenu = (toggle) => ({
	type: TOGGLE_MENU,
	payload: toggle
});
