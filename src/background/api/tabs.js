/**
 *
 */
export const CONTENT_SCRIPTS = [
	'dist/common.js',
	'dist/container.js',
	'dist/helpers.js'
];

/**
 *
 */
export const CONTENT_STYLES = [
	'dist/container.css',
	'dist/helpers.css'
];

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
				? resolve(tabs[0])
				: reject('No tab found')
		))
	);
};

/**
 *
 */
export const sendMessageToTab = (id, message, options = {}) => {
	// Chrome API wrapper
	if (typeof browser === 'undefined') {
		return new Promise((resolve, reject) => {
			chrome.tabs.sendMessage(id, message, options, (response) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve(response);
				}
			});
		});
	}

	return browser.tabs.sendMessage(id, message, options);
};

/**
 *
 */
export const captureVisibleTab = (options = {
	format: 'png'
}) => {
	const toImage = (source) => {
		const image = new Image();
		image.src = source;
		return image;
	};

	// Chrome API wrapper
	if (typeof browser === 'undefined') {
		return new Promise((resolve, reject) => {
			chrome.tabs.captureVisibleTab(null, options, (source) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve(toImage(source));
				}
			});
		});
	}

	return browser.tabs.captureVisibleTab(null, options)
		.then(toImage);
};

/**
 *
 */
export const closeTab = (id) =>
	chrome.tabs.remove(id);

/**
 *
 */
export const createTab = (options) =>
	new Promise((resolve, reject) => // eslint-disable-line no-new
		chrome.tabs.create(options, (newTab) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve(newTab);
			}
		})
	);

/**
 *
 */
export const executeScript = (tabId, details) => {
	if (typeof browser === 'undefined') {
		return new Promise((resolve, reject) => // eslint-disable-line no-new
			chrome.tabs.executeScript(tabId, details, (results) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve(results);
				}
			})
		);
	}

	return browser.tabs.executeScript(tabId, details);
};

/**
 *
 */
export const insertCSS = (tabId, details) => {
	if (typeof browser === 'undefined') {
		return new Promise((resolve, reject) => // eslint-disable-line no-new
			chrome.tabs.insertCSS(tabId, details, (results) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				} else {
					resolve(results);
				}
			})
		);
	}

	return browser.tabs.insertCSS(tabId, details);
};

/**
 *
 */
export const onUpdate = (callback) =>
	chrome.tabs.onUpdated.addListener(callback);
