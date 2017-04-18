import {Position} from '../api/panel';
import {SET_POSITION, SET_PAGE_INFO, TOGGLE_FOLD, OPEN, CLOSE} from '../actions/panel';



/**
 *
 */
const initialState = {
	position: Position.right,
	folded: false,
	opened: false,
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

		case OPEN:
			return {
				...state,
				opened: true
			};

		case CLOSE:
			return {
				...state,
				opened: false
			};

		default:
			return state;
	}
}
