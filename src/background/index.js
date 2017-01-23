import {get} from 'lodash';
import {
	OPEN_PANEL, CLOSE_PANEL, REQUEST_INITIAL_STATE, OPEN_POPUP, CLOSE_POPUP
} from '../common/actions/runtime';
import {IFRAME_FILE} from '../container/api/iframe';
import {openWindow} from './api/windows';
import {fetchCurrentTab, closeTab} from './api/tabs';
import {get as getOption} from '../common/api/options';
import {setReferenceVersion} from '../common/actions/reference';
import createAppInstance from './createAppInstance';



/**
 *	A map of open instances, indexed by tab id.
 */
const instances = {};

/**
 *	Opens a devtools popup in development mode.
 */
if (process.env.NODE_ENV !== 'production') {
	openWindow({
		url: chrome.runtime.getURL('src/devtools/content.html'),
		type: 'popup'
	});
}

/**
 *	Dispatches every message to the content scripts, allowing
 *	content scripts to talk to each other.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const tabId = sender.tab && sender.tab.id;
	const instance = instances[tabId];

	if (!instance) {
		return;
	}

	switch (message.type) {
		// sends the store's state to the instance.
		case REQUEST_INITIAL_STATE:
			sendResponse(instance.store.getState());
			break;

		// if the instance runs in a tab, opens a popup and
		// indexes the instance on the new tab id,
		case OPEN_POPUP:
			if (!instance.isPopup()) {
				openWindow({
					url: chrome.runtime.getURL(IFRAME_FILE),
					type: 'popup'
				}).then((popup) => {
					const id = get(popup, 'tabs[0].id');
					instance.switchToPopup(id);
					instances[id] = instance;
					delete instances[tabId];
				});
			}
			break;

		// if the instance runs in a popup, desindexes it and
		// closes it.
		case CLOSE_POPUP:
			if (instance.isPopup()) {
				const id = instance.switchToTab();
				instances[id] = instance;
				delete instances[tabId];
				closeTab(tabId);
			}
			break;

		// broadcasts message
		default:
			instance.sendMessage(message);
			break;
	}
});

/**
 *	Asks the content script to toggle the extension's container
 *	when one clicks the extension icon in the browser UI.
 */
chrome.browserAction.onClicked.addListener(() =>
	fetchCurrentTab().then((id) => {
		// shutdowns the extension on the tab if it is already open
		if (instances[id]) {
			instances[id].sendMessage({
				type: CLOSE_PANEL
			}).then(() => {
				delete instances[id];
			});

			return;
		}

		// creates an instance and indexes it on the tab id.
		const instance = createAppInstance(id);
		instances[id] = instance;

		// opens the panel and load initial data.
		instance.sendMessage({
			type: OPEN_PANEL
		}).then(() =>
			getOption('reference')
		).then((version = '3') => {
			instance.dispatch(setReferenceVersion(version));
		});
	})
);

/**
 *	Removes associated data when a tab is closed.
 */
chrome.tabs.onRemoved.addListener((id) => {
	if (instances[id]) {
		delete instances[id];
	}
});
