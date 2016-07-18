import {SET_CURRENT} from '../actions/tabs';



/**
 *
 */
const initialState = {
	current: null
};

/**
 *
 */
export default function tabs(state = initialState, {type, payload}) {
	switch (type) {
		case SET_CURRENT:
			return {
				...state,
				current: payload.tabId
			};

		default:
			return state;
	}
}
