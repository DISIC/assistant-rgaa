import {
	SET_ERRORS, SET_CONTENT, SET_PENDING, SET_NON_APPLICABLE_THEMES,
	SET_NON_APPLICABLE_CRITERIA, SET_TESTS_RESULTS, RESET
} from '../actions/imports';



/**
 *
 */
const initialState = {
	errors: [],
	content: null,
	pending: false,
	testResults: {}
};

/**
 *
 */
export default function imports(state = initialState, {type, payload}) {
	switch (type) {
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
				errors: []
			};

		case SET_PENDING:
			return {
				...state,
				pending: payload.pending
			};

		case SET_TESTS_RESULTS:
			return {
				...state,
				testResults: payload.data
			};

		case RESET:
			return initialState;

		default:
			return state;
	}
}
