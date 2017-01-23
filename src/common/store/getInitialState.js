import {sendMessage} from '../api/runtime';
import {REQUEST_INITIAL_STATE} from '../actions/runtime';



/**
 *	Create a store with initialState fetched from redux-persist given storage
 *
 *	@return {Promise} promise resolved with initial state.
 */
export default function getInitialState() {
	return sendMessage({
		type: REQUEST_INITIAL_STATE
	});
}
