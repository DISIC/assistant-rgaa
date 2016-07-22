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
export const applyHelpers = (helpers) => ({
	type: APPLY,
	payload: {
		helpers
	}
});

/**
 *
 */
export const revertHelpers = (helpers) => ({
	type: REVERT,
	payload: {
		helpers
	}
});

/**
 *
 */
export const requestApplyHelpers = (helpers) => ({
	type: REQUEST_APPLY,
	payload: {
		helpers
	}
});

/**
 *
 */
export const requestRevertHelpers = (helpers) => ({
	type: REQUEST_REVERT,
	payload: {
		helpers
	}
});
