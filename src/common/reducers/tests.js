import {without} from 'lodash';
import {ENABLE, DISABLE} from '../actions/tests';



/**
 *
 */
export const initialState = {
	enabled: []
};

/**
 *
 */
export default function tests(state = initialState, {type, payload}) {
	switch (type) {
		case ENABLE:
			return {
				...state,
				enabled: [...state.enabled, payload]
			};

		case DISABLE:
			return {
				...state,
				enabled: without(state.enabled, payload)
			};

		default:
			return state;
	}
}
