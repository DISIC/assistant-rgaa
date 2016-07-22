import {includes} from 'lodash';
import store from '../store';
import {sendToContent} from '../api/tabs';
import * as syncedActions from './actions';



/**
 * "receive" part of the synchronization between
 * 	background and content scripts.
 *
 * 	the "send" part is made through the sagas:
 * 	see sagas/messages and sagas/synced-actions
 */
export const handleContentMessages = () => {
	chrome.runtime.onMessage.addListener((message) => { // eslint-disable-line no-undef
		// every message received by the background script
		// is dispatched to content-scripts
		sendToContent(message);

		if (!message.type) {
			return false;
		}

		// when receiving specific messages, dispatch them through the store
		if (includes(syncedActions.receive, message.type)) {
			store.dispatch(message);
		}

		return true;
	});
};
