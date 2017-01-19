/**
 *
 */
export const SET_ALL = 'common/criteria/SET_ALL';
export const SET_CURRENT = 'common/criteria/SET_CURRENT';



/**
 *
 */
export const setAll = (criteria) => ({
	type: SET_ALL,
	payload: criteria
});

/**
 *
 */
export const setCurrent = (id) => ({
	type: SET_CURRENT,
	payload: id
});
