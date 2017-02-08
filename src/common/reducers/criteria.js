import {
	SET_ALL, SET_CURRENT, OPEN_CRITERION, CLOSE_CRITERION
} from '../actions/criteria';
import {without} from 'lodash';



/**
 *
 */
export const initialState = {
	list: {},
	current: null,
	opened: []
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
