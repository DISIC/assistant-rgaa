import {SET_POSITION, SET_POPUP_MODE} from '../actions/dock';



export const POSITION_RIGHT = 'right';
export const POSITION_LEFT = 'left';
export const POSITION_BOTTOM = 'bottom';

/**
 *
 */
const initialState = {
	position: POSITION_RIGHT,
	popup: false
};

/**
 *
 */
export function dock(state = initialState, {type, payload}) {
	switch (type) {
		case SET_POSITION:
			return {
				...state,
				position: payload.position
			};

		case SET_POPUP_MODE:
			return {
				...state,
				popup: payload.popup
			};

		default:
			return state;
	}
}
