import {Position} from '../api/panel';
import {SET_POSITION} from '../actions/panel';



/**
 *
 */
const initialState = {
	position: Position.right
};

/**
 *
 */
export default function panel(state = initialState, {type, payload}) {
	switch (type) {
		case SET_POSITION:
			return {
				...state,
				position: payload
			};

		default:
			return state;
	}
}
