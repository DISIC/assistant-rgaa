import {Position} from '../api/panel';
import {SET_POSITION, SET_PAGE_INFO} from '../actions/panel';



/**
 *
 */
const initialState = {
	position: Position.right,
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

		case SET_PAGE_INFO:
			return {
				...state,
				pageInfo: payload
			};

		default:
			return state;
	}
}
