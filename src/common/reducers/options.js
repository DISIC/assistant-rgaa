import {SET_REFERENCE} from '../actions/options';



/**
 *
 */
const initialState = {
	referenceFile: null
};

/**
 *
 */
export default function options(state = initialState, {type, payload}) {
	switch (type) {
		case SET_REFERENCE:
			return {
				...state,
				referenceFile: payload.file
			};

		default:
			return state;
	}
}
