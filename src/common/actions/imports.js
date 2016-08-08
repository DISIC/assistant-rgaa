/**
 *
 */
export const OPEN_MODAL = 'common/imports/OPEN_MODAL';
export const CLOSE_MODAL = 'common/imports/CLOSE_MODAL';
export const SET_FILE_CONTENT = 'common/imports/SET_FILE_CONTENT';



/**
 *
 */
export const openModal = () => ({
	type: OPEN_MODAL,
	payload: {}
});

/**
 *
 */
export const closeModal = () => ({
	type: CLOSE_MODAL,
	payload: {}
});

/**
 *
 */
export const setFileContent = (content) => ({
	type: SET_FILE_CONTENT,
	payload: {
		data: content
	}
});
