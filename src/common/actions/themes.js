/**
 *
 */
export const TOGGLE_MENU = 'common/themes/TOGGLE_MENU';
export const SAVE_SCROLL_POSITION = 'common/themes/SAVE_SCROLL_POSITION';



/**
 *
 */
export const toggleMenu = (toggle) => ({
	type: TOGGLE_MENU,
	payload: toggle
});

/**
 *
 */
export const saveScrollPosition = (y) => ({
	type: SAVE_SCROLL_POSITION,
	payload: y
});
