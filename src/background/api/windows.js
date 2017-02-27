import {get} from 'lodash';



/**
 *
 */
export const openWindow = (options) =>
	new Promise((resolve, reject) => // eslint-disable-line no-new
		chrome.windows.create(options, (newWindow) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve(newWindow);
			}
		})
	);

/**
 *
 */
export const closeWindow = (id) =>
	new Promise((resolve, reject) => // eslint-disable-line no-new
		chrome.windows.remove(id, () => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve();
			}
		})
	);

/**
 *
 */
export const getWindow = (id, options = {populate: true}) =>
	new Promise((resolve, reject) => // eslint-disable-line no-new
		chrome.windows.get(id, options, (windowInfo) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve(windowInfo);
			}
		})
	);

/**
 * get the window first tab's id by making a new getWindow request if necessary
 *
 * this is necessary because depending on context, a window object might not
 * have a tabs property (ie, the result of a windows.create in firefox < 52)
 */
export const getWindowTabId = (windowObject) =>
	new Promise((resolve, reject) => {
		const id = get(windowObject, 'tabs[0].id');
		if (id) {
			resolve(id);
		} else {
			getWindow(windowObject.id, {populate: true})
				.then((data) =>
					resolve(get(data, 'tabs[0].id'))
				)
				.catch((message) =>
					reject(message)
				);
		}
	});

export const getWindowObject = (tabId) => {
	const views = chrome.extension.getViews({tabId});
	return views.length ? views[0] : null;
};
