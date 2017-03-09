import {SET_REFERENCE, SET_THEMES} from '../actions/reference';



/**
 *
 */
export const initialState = {
	data: {},
	themes: {},
	criteria: {},
	tests: {}
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

		case SET_THEMES:
			return {
				...state,
				themes: payload
			};

		default:
			return state;
	}
}
