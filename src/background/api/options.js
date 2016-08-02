/**
 *
 */
export const open = () => {
	return new Promise((resolve, reject) => { // eslint-disable-line no-new
		chrome.runtime.openOptionsPage(() => { // eslint-disable-line no-undef
			if (!chrome.runtime.lastError) { // eslint-disable-line no-undef
				resolve();
			} else {
				reject(chrome.runtime.lastError); // eslint-disable-line no-undef
			}
		});
	});
}
