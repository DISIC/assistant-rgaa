import {isObject} from 'lodash';
import {INVALID_RESPONSE} from '../actions/runtime';



/**
 *
 */
export const sendMessage = (message, options = {}) =>
	new Promise((resolve, reject) => {
		const handleResponse = (value) => {
			if (value === INVALID_RESPONSE) {
				reject();
			} else {
				resolve(value);
			}
		};

		// Chrome uses a callback as the third parameter...
		const promise = chrome.runtime.sendMessage(
			message,
			options,
			handleResponse
		);

		// Firefox returns a promise instead.
		if (isObject(promise) && promise.then) {
			promise.then(handleResponse, reject);
		}
	});
