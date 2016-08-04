/**
 *
 */
export default () => new Promise((resolve, reject) => {
	chrome.runtime.getBackgroundPage(({rgaaExt}) => {
		if (chrome.runtime.lastError) {
			return reject(chrome.runtime.lastError);
		}
		return resolve(rgaaExt.store);
	});
});
