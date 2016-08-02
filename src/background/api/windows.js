/**
 *
 */
export const create = (options) =>
	new Promise(resolve => // eslint-disable-line no-new
		chrome.windows.create(options, resolve) // eslint-disable-line no-undef
	);

/**
 *
 */
export const remove = (id) =>
	new Promise((resolve) => // eslint-disable-line no-new
		chrome.windows.remove(id, resolve) // eslint-disable-line no-undef
	);
