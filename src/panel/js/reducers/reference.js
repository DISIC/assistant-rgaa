import data from '../../../../data/references/rgaa-3-2016';
import {SET_CURRENT_THEME, SET_CURRENT_CRITERION} from '../actions/reference';
import {getFirstTheme, getFirstCriterion} from '../api/reference';



/**
 *
 */
const initialState = {
	data,
	theme: getFirstTheme(data),
	criterion: getFirstCriterion(getFirstTheme(data))
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

		default:
			return state;
	}
}
