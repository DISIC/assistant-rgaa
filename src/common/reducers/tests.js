import update from 'react-addons-update';
import {SET_ALL, ENABLE, DISABLE} from '../actions/tests';



/**
 *
 */
export const initialState = {
	list: {},
	current: null
};

/**
 *
 */
export default function tests(state = initialState, {type, payload}) {
	switch (type) {
		case SET_ALL:
			return {
				...state,
				list: payload
			};

		case ENABLE:
			return update(state, {
				list: {
					[payload]: {
						enabled: {
							$set: true
						}
					}
				}
			});

		case DISABLE:
			return update(state, {
				list: {
					[payload]: {
						enabled: {
							$set: false
						}
					}
				}
			});

		default:
			return state;
	}
}
