import {SET_ALL, SET_CURRENT, TOGGLE_MENU} from '../actions/themes';



/**
 *
 */
export const initialState = {
	list: {},
	current: null,
	menuIsOpen: false
};

/**
 *
 */
export default function themes(state = initialState, {type, payload}) {
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

		case TOGGLE_MENU:
			return {
				...state,
				menuIsOpen: payload
			};

		default:
			return state;
	}
}
