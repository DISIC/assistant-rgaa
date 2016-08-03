import data from '../../../../data/references/rgaa-3-2016';
import {
	ENABLE_TEST, DISABLE_TEST, SET_CURRENT_THEME, SET_CURRENT_CRITERION
} from '../actions/reference';
import {getFirstTheme, getFirstCriterion} from '../api/reference';



/**
 *
 */
const initialState = {
	data,
	theme: getFirstTheme(data),
	criterion: getFirstCriterion(getFirstTheme(data)),
	tests: {}
};

/**
 *
 */
export default function reference(state = initialState, {type, payload}) {
	switch (type) {
		case SET_CURRENT_THEME:
			return {
				...state,
				theme: payload.theme,
				criterion: getFirstCriterion(payload.theme)
			};

		case SET_CURRENT_CRITERION:
			return {
				...state,
				criterion: payload.criterion
			};

		case ENABLE_TEST:
			return {
				...state,
				tests: {
					...state.tests,
					[payload.id]: true
				}
			};

		case DISABLE_TEST:
			return {
				...state,
				tests: {
					...state.tests,
					[payload.id]: false
				}
			};

		default:
			return state;
	}
}
