import {OPEN_MODAL, CLOSE_MODAL} from '../actions/imports';



/**
 *
 */
const initialState = {
	modal: {
		open: false
	}
};

/**
 *
 */
export default function imports(state = initialState, {type}) {
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

		default:
			return state;
	}
}
