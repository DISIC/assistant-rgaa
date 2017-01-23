import {isObject} from 'lodash';



/**
 *
 */
export const sendMessage = (message, options = {}) =>
	new Promise((resolve) => {
		// Chrome uses a callback as the third parameter...
		const promise = chrome.runtime.sendMessage(message, options, resolve);

		// Firefox returns a promise instead.
		if (isObject(promise) && promise.then) {
			resolve(promise);
		}
	});
