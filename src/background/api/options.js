/**
 *
 */
export const open = () =>
	new Promise((resolve, reject) => { // eslint-disable-line no-new
		chrome.runtime.openOptionsPage(() => {
			if (!chrome.runtime.lastError) {
				resolve();
			} else {
				reject(chrome.runtime.lastError);
			}
		});
	});
