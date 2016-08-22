import {SET} from '../actions/instructions';



/**
 *
 */
const initialState = {};

/**
 *
 */
export default function instructions(state = initialState, {type, payload}) {
	switch (type) {
		case SET:
			return payload.data;

		default:
			return state;
	}
}
