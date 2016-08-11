import {
	OPEN_MODAL, CLOSE_MODAL,
	RESET,
	SET_ERRORS, SET_CONTENT, SET_PENDING,
	SET_NON_APPLICABLE_THEMES, SET_NON_APPLICABLE_CRITERIA, SET_TESTS_RESULTS
} from '../actions/imports';



/**
 *
 */
const initialState = {
	modal: {
		open: false
	},
	errors: '',
	content: null,
	pending: false,
	inactiveThemeIds: [],
	inactiveCriterionIds: [],
	testResults: {}
};

/**
 *
 */
export default function imports(state = initialState, {type, payload}) {
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					open: true
				}
			};

		case CLOSE_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					open: false
				}
			};

		case RESET:
			return {
				...state,
				errors: '',
				content: null,
				pending: false
			};

		case SET_ERRORS:
			return {
				...state,
				errors: payload.errors,
				content: null
			};

		case SET_CONTENT:
			return {
				...state,
				content: payload.content,
				pending: false,
				errors: ''
			};

		case SET_PENDING:
			return {
				...state,
				pending: payload.pending
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

		default:
			return state;
	}
}
