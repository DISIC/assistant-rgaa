import {isObject} from 'lodash';



/**
 *
 */
export const fetchCurrentTab = () => {
	const query = {
		active: true,
		currentWindow: true
	};

	// eslint-disable-next-line no-new
	return new Promise((resolve, reject) =>
		chrome.tabs.query(query, (tabs) => (
			tabs.length
				? resolve(tabs[0].id)
				: reject('No tab found')
		))
	);
};

/**
 *
 */
export const sendMessageToTab = (id, message) =>
	new Promise((resolve) => {
		const promise = chrome.tabs.sendMessage(id, message, {}, resolve);

		if (isObject(promise) && promise.then) {
			resolve(promise);
		}
	});

/**
 *
 */
export const captureVisibleTab = () =>
	new Promise((resolve, reject) => {
		const callback = (source) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				const image = new Image();
				image.src = source;
				resolve(image);
			}
		};

		const promise = chrome.tabs.captureVisibleTab(null, {
			format: 'png'
		}, callback);

		if (isObject(promise) && promise.then) {
			promise.then(callback);
		}
	});

/**
 *
 */
export const closeTab = (id) =>
	chrome.tabs.remove(id);
