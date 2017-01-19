/**
 *
 */
export const FETCH_THEME = 'common/reference/FETCH';
export const SET_REFERENCE = 'common/reference/SET_REFERENCE';
export const SET_REFERENCE_VERSION = 'common/reference/SET_REFERENCE_VERSION';



/**
 *
 */
export const setReferenceVersion = (version) => ({
	type: SET_REFERENCE_VERSION,
	payload: {
		version
	}
});

/**
 *
 */
export const setReference = (data) => ({
	type: SET_REFERENCE,
	payload: {
		data
	}
});
