import {getSource} from './source';
import {createTab, onUpdate, fetchCurrentTab} from '../../background/api/tabs';
import {getWindowObject} from '../../background/api/windows';



/**
 *
 */
export const validateLocalPage = (url) => {
	let source;
	return getSource(url)
		.then((sourceString) => {
			source = sourceString;
		})
		.then(() =>
			fetchCurrentTab()
		)
		.then(currentTab => (
			createTab({
				url: chrome.runtime.getURL('src/common/content/validateLocalPage.html'),
				index: currentTab.index + 1
			})
		))
		.then(tab => {
			// @see http://stackoverflow.com/q/18045348
			// I'm sure there is some better way to do this but well…
			// couldn't figure it out with the time I have right now
			onUpdate((tabId, {status}) => {
				if (status !== 'complete' || tabId !== tab.id) {
					return;
				}
				const tabWindow = getWindowObject(tab.url, {type: 'tab', windowId: tab.windowId});
				if (!tabWindow || !tabWindow.validateSource) {
					return;
				}
				tabWindow.validateSource(source);
			});
		});
};
