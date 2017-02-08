import {sendMessage} from '../api/runtime';
import {REQUEST_INITIAL_STATE} from '../actions/runtime';



/**
 *	Creates a store with initialState fetched from background
 *	store.
 *
 *	@return {Promise} promise resolved with initial state.
 */
export default function getInitialState() {
	return sendMessage({
		type: REQUEST_INITIAL_STATE
	});
}
