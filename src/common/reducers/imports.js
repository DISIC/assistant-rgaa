import {OPEN_MODAL, CLOSE_MODAL, RESET, SET_ERRORS, SET_CONTENT} from '../actions/imports';



/**
 *
 */
const initialState = {
	modal: {
		open: false
	},
	errors: '',
	content: null
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
				content: null
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
				errors: ''
			};

		default:
			return state;
	}
}
