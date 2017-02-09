import {SET_ALL, TOGGLE_MENU} from '../actions/themes';



/**
 *
 */
export const initialState = {
	list: {},
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

		case TOGGLE_MENU:
			return {
				...state,
				menuIsOpen: payload
			};

		default:
			return state;
	}
}
