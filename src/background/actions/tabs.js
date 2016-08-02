/**
 *
 */
export const SET_CURRENT = 'background/tabs/SET_CURRENT';
export const GET_CURRENT = 'background/tabs/GET_CURRENT';



export const setCurrent = (tabId) => ({
	type: SET_CURRENT,
	payload: {
		tabId
	}
});

export const getCurrent = () => ({
	type: GET_CURRENT,
	payload: {}
});
