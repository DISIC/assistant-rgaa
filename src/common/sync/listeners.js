import {includes} from 'lodash';



/*
 *
 */
export const dispatchOnMessage = (store, actions) => {
	chrome.runtime.onMessage.addListener((message) => { // eslint-disable-line no-undef
		if (!message.type) {
			return false;
		}

		if (includes(actions, message.type)) {
			store.dispatch(message);
		}

		return true;
	});
};
