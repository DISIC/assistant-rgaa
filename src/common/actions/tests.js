/**
 *
 */
export const SET_ALL = 'common/tests/SET_ALL';
export const ENABLE = 'common/tests/ENABLE';
export const DISABLE = 'common/tests/DISABLE';



/**
 *
 */
export const setAll = (tests) => ({
	type: SET_ALL,
	payload: tests
});

/**
 *
 */
export const enable = (id) => ({
	type: ENABLE,
	payload: id
});

/**
 *
 */
export const disable = (id) => ({
	type: DISABLE,
	payload: id
});
