import {without} from 'lodash';
import {OPEN_CRITERION, CLOSE_CRITERION} from '../actions/criteria';



/**
 *
 */
export const initialState = {
	opened: []
};

/**
 *
 */
export default function criteria(state = initialState, {type, payload}) {
	switch (type) {
		case CLOSE_CRITERION:
			return {
				...state,
				opened: without(state.opened, payload)
			};

		case OPEN_CRITERION:
			return {
				...state,
				opened: [...state.opened, payload]
			};

		default:
			return state;
	}
}
