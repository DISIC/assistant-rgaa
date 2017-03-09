/**
 *
 */
export const FETCH_THEME = 'common/reference/FETCH';
export const SET_REFERENCE_VERSION = 'common/reference/SET_REFERENCE_VERSION';
export const SET_DATA = 'common/reference/SET_DATA';



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
export const setData = (data) => ({
	type: SET_DATA,
	payload: data
});
