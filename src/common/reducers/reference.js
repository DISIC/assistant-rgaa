import {SET_DATA} from '../actions/reference';



/**
 *
 */
export const initialState = {
	reference: {},
	themes: {},
	criteria: {},
	tests: {}
};

/**
 *
 */
export default function reference(state = initialState, {type, payload}) {
	switch (type) {
		case SET_DATA:
			return {
				reference: payload.reference,
				themes: payload.themes,
				criteria: payload.criteria,
				tests: payload.tests
			};

		default:
			return state;
	}
}
