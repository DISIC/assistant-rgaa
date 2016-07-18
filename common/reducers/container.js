import {REQUEST_TOGGLE, TOGGLE, SET_POSITION, REQUEST_POPUP, SET_POPUP} from '../actions/container';



export const POSITION_RIGHT = 'right';
export const POSITION_LEFT = 'left';
export const POSITION_BOTTOM = 'bottom';

/**
 *
 */
const initialState = {
	open: false,
	openIntent: false,
	position: POSITION_RIGHT,
	popupIntent: false,
	popupId: null
};

/**
 *
 */
export default function container(state = initialState, {type, payload}) {
	switch (type) {
		case SET_POSITION:
			return {
				...state,
				position: payload.position
			};

		case REQUEST_TOGGLE:
			return {
				...state,
				openIntent: !state.openIntent
			};

		case TOGGLE:
			return {
				...state,
				open: !state.open
			};

		case REQUEST_POPUP:
			return {
				...state,
				popupIntent: payload.toggle
			};

		case SET_POPUP:
			return {
				...state,
				popupId: payload.windowId
			};

		default:
			return state;
	}
}
