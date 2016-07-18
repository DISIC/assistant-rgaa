import {
	POSITION_LEFT,
	POSITION_RIGHT,
	POSITION_BOTTOM
} from '../reducers/dock';



/**
 *
 */
export const SET_POSITION = 'dock/SET_POSITION';
export const TOGGLE_POPUP = 'dock/TOGGLE_POPUP';



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

export const togglePopup = () => ({
	type: TOGGLE_POPUP,
	payload: {}
});
