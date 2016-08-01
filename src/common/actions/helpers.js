/**
 *
 */
export const APPLY = 'helpers/APPLY';
export const REVERT = 'helpers/REVERT';
export const REQUEST_APPLY = 'helpers/REQUEST_APPLY';
export const REQUEST_REVERT = 'helpers/REQUEST_REVERT';



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

/**
 *
 */
export const requestApplyHelpers = (id, helpers) => ({
	type: REQUEST_APPLY,
	payload: {
		id,
		helpers
	}
});

/**
 *
 */
export const requestRevertHelpers = (id, helpers) => ({
	type: REQUEST_REVERT,
	payload: {
		id,
		helpers
	}
});
