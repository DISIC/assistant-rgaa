import {
	POSITION_LEFT,
	POSITION_RIGHT,
	POSITION_BOTTOM
} from '../reducers/container';



/**
 *
 */
export const TOGGLE = 'container/TOGGLE';
export const REQUEST_TOGGLE = 'container/REQUEST_TOGGLE';
export const SET_POSITION = 'container/SET_POSITION';
export const REQUEST_POPUP = 'container/REQUEST_POPUP';
export const SET_POPUP = 'container/SET_POPUP';



export const toggle = () => ({
	type: TOGGLE,
	payload: {}
});

export const requestToggle = () => ({
	type: REQUEST_TOGGLE,
	payload: {}
});

export const dockToLeft = () => ({
	type: SET_POSITION,
	payload: {
		position: POSITION_LEFT
	}
});

export const dockToRight = () => ({
	type: SET_POSITION,
	payload: {
		position: POSITION_RIGHT
	}
});

export const dockToBottom = () => ({
	type: SET_POSITION,
	payload: {
		position: POSITION_BOTTOM
	}
});

/**
 * content scripts will say they want the popup to show or hide
 */
export const requestPopup = (showOrHide) => ({
	type: REQUEST_POPUP,
	payload: {
		toggle: showOrHide
	}
});

/**
 * the background script will actually show or hide the popup
 */
export const setPopup = (windowId) => ({
	type: SET_POPUP,
	payload: {
		windowId
	}
});
