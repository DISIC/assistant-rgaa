import {SET_ALL, SET_CURRENT} from '../actions/criteria';



/**
 *
 */
export const initialState = {
	list: {},
	current: null
};

/**
 *
 */
export default function criteria(state = initialState, {type, payload}) {
	switch (type) {
		case SET_ALL:
			return {
				...state,
				list: payload
			};

		case SET_CURRENT:
			return {
				...state,
				current: payload
			};

		default:
			return state;
	}
}
