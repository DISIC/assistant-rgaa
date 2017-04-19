import {get} from 'lodash';



/**
 *	Tells if the extension currently runs on chrome.
 */
const IS_CHROME = (
	typeof browser === 'undefined'
	|| browser.runtime === undefined
);

/**
 *	Wraps the given chrome API method so it returns a promise
 *	instead of using a callback.
 */
const chromeApi = (fn) => (...args) =>
	new Promise((resolve, reject) =>
		fn(...args, (result) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve(result);
			}
		})
	);

/**
 *	Returns a cross browser version of a browser API method.
 */
export const api = (method) =>
	IS_CHROME
		? chromeApi(get(chrome, method))
		: get(browser, method);
