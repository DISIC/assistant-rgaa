import {sendMessage} from '../common/api/runtime';
import createStore from './createStore';



/**
 *
 */
export default function createOptionsInstance(sharedStore) {
	const store = createStore(
		'background-options',
		sharedStore,
		sendMessage
	);

	return {
		sendMessage,
		store,
		dispatch: store.dispatch
	};
}
