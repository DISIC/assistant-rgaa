/**
 *
 */
export const APPLY = 'helpers/APPLY';
export const REVERT = 'helpers/REVERT';



/**
 *
 */
export const applyHelpers = (id, helpers) => ({
	type: APPLY,
	payload: {
		id,
		helpers
	}
});

/**
 *
 */
export const revertHelpers = (id, helpers) => ({
	type: REVERT,
	payload: {
		id,
		helpers
	}
});
