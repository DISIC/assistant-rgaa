/**
 *
 */
export const APPLY_HELPERS = 'tests/APPLY_HELPERS';
export const REVERT_HELPERS = 'tests/REVERT_HELPERS';



/**
 *
 */
export const applyHelpers = (helpers) => ({
	type: APPLY_HELPERS,
	payload: {
		helpers
	}
});

/**
 *
 */
export const revertHelpers = (helpers) => ({
	type: REVERT_HELPERS,
	payload: {
		helpers
	}
});
