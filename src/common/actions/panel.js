/**
 *
 */
export const SET_POSITION = 'common/panel/SET_POSITION';
export const SET_PAGE_INFO = 'common/panel/SET_PAGE_INFO';



/**
 *
 */
export const setPosition = (position) => ({
	type: SET_POSITION,
	payload: position
});

/**
 *
 */
export const setPageInfo = (data) => ({
	type: SET_PAGE_INFO,
	payload: data
});
