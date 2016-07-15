import {SET_POSITION} from '../actions/dock';



export const POSITION_RIGHT = 'right';
export const POSITION_LEFT = 'left';
export const POSITION_BOTTOM = 'bottom';
export const POSITION_EXTERNAL = 'external';

/**
 *
 */
const initialState = {
	position: POSITION_RIGHT
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

		default:
			return state;
	}
}
