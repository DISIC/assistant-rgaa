import data from '../../../data/references/3';
import {
	SET_REFERENCE,
	SET_CURRENT_THEME, SET_CURRENT_CRITERION,
	SET_NON_APPLICABLE_THEMES, SET_NON_APPLICABLE_CRITERIA, SET_TESTS_RESULTS,
	ENABLE_TEST, DISABLE_TEST
} from '../actions/reference';
import {getFirstTheme, getFirstCriterion} from '../api/reference';



/**
 *
 */
export const initialState = {
	data,
	theme: getFirstTheme(data),
	criterion: getFirstCriterion(getFirstTheme(data)),
	tests: {},
	inactiveThemeIds: [],
	inactiveCriterionIds: [],
	testResults: {}
};

/**
 *
 */
export default function reference(state = initialState, {type, payload}) {
	switch (type) {
		case SET_REFERENCE: {
			const theme = getFirstTheme(payload.data);
			return {
				...state,
				data: payload.data,
				theme,
				criterion: getFirstCriterion(theme),
				tests: {}
			};
		}

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

		case SET_NON_APPLICABLE_THEMES:
			return {
				...state,
				inactiveThemeIds: payload.ids
			};

		case SET_NON_APPLICABLE_CRITERIA:
			return {
				...state,
				inactiveCriterionIds: payload.ids
			};

		case SET_TESTS_RESULTS:
			return {
				...state,
				testResults: payload.data
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
