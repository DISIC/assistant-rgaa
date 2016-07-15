import {
	POSITION_LEFT,
	POSITION_RIGHT,
	POSITION_BOTTOM,
	POSITION_EXTERNAL
} from '../reducers/dock';



/**
 *
 */
export const SET_POSITION = 'dock/SET_POSITION';



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

export const undock = () => ({
	type: SET_POSITION,
	payload: {
		position: POSITION_EXTERNAL
	}
});
