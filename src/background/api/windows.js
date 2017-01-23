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
