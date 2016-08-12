import {
	POSITION_LEFT,
	POSITION_RIGHT,
	POSITION_BOTTOM
} from '../reducers/container';



/**
 *
 */
export const TOGGLE = 'common/container/TOGGLE';
export const SET_POSITION = 'common/container/SET_POSITION';
export const TOGGLE_POPUP = 'common/container/TOGGLE_POPUP';
export const SET_POPUP = 'common/container/SET_POPUP';



export const toggle = () => ({
	type: TOGGLE,
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
 * optionnaly pass a true/false to force show/hide the popup
 */
export const togglePopup = (force = undefined) => ({
	type: TOGGLE_POPUP,
	payload: {
		force
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
