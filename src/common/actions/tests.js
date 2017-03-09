/**
 *
 */
export const ENABLE = 'common/tests/ENABLE';
export const DISABLE = 'common/tests/DISABLE';



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
