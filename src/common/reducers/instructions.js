import data from '../../../data/instructions/3';
import {SET} from '../actions/instructions';



/**
 *
 */
const initialState = data;

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
