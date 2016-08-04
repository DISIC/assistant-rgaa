/**
 *
 */
export const OPEN = 'common/options/OPEN';
export const SET_REFERENCE_VERSION = 'common/options/SET_REFERENCE_VERSION';



/**
 *
 */
export const open = () => ({
	type: OPEN,
	payload: {}
});

/**
 *
 */
export const setReferenceVersion = (version) => ({
	type: SET_REFERENCE_VERSION,
	payload: {
		version
	}
});
