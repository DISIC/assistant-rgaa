import {isObject, isFunction, isEmpty} from 'lodash';
import {INVALID_RESPONSE} from '../actions/runtime';



/**
 *
 */
export const sendMessage = (message, options = {}) =>
	new Promise((resolve, reject) => {
		const handleResponse = (value) => {
			console.log('handleResponse', value)
			if (value === INVALID_RESPONSE) {
				reject();
			} else {
				resolve(value);
			}
		};

		// Chrome uses a callback as the third parameter...
		if (typeof browser === 'undefined') {
			chrome.runtime.sendMessage(message, options, (value) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					handleResponse(value);
				}
			});

		// Firefox returns a promise instead.
		} else {
			browser.runtime.sendMessage(message, options)
				.then(handleResponse, reject);
		}
	});

/**
 *
 */
export const createMessageHandler = (handler) =>
	(message, sender, sendResponse) => {
		const response = handler(message, sender);
console.log('MESSAGE HANDLER', response, sendResponse)
		if (response instanceof Promise) {
			console.log('is promise')
			response.then(sendResponse);
			return true;
		} else if (!isEmpty(response)) {
			console.log('is value')
			sendResponse(response);
			//return true;
		}
	};
