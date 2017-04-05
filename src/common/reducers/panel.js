import {Position} from '../api/panel';
import {SET_POSITION, SET_PAGE_INFO, TOGGLE_FOLD} from '../actions/panel';



/**
 *
 */
const initialState = {
	position: Position.right,
	folded: false,
	pageInfo: {}
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

		case TOGGLE_FOLD:
			return {
				...state,
				folded: payload
			};

		case SET_PAGE_INFO:
			return {
				...state,
				pageInfo: payload
			};

		default:
			return state;
	}
}
