import {SET_REFERENCE_VERSION} from '../actions/options';
import {initialState as initialReferenceState} from './reference';



/**
 *
 */
const initialState = {
	referenceVersion: initialReferenceState.data.version
};

/**
 *
 */
export default function options(state = initialState, {type, payload}) {
	switch (type) {
		case SET_REFERENCE_VERSION:
			return {
				...state,
				referenceVersion: payload.version
			};

		default:
			return state;
	}
}
