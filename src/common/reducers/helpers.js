import {SET_HELPERS} from '../actions/helpers';



/**
 *
 */
const initialState = {};

/**
 *
 */
export default function helpers(state = initialState, {type, payload}) {
	switch (type) {
		case SET_HELPERS: {
			return payload.data;
		}

		default:
			return state;
	}
}
