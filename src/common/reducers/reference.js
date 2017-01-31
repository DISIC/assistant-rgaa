import {SET_REFERENCE} from '../actions/reference';



/**
 *
 */
export const initialState = {
	data: {}
};

/**
 *
 */
export default function reference(state = initialState, {type, payload}) {
	switch (type) {
		case SET_REFERENCE:
			return {
				...state,
				data: payload.data
			};

		default:
			return state;
	}
}
