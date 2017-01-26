import {get} from 'lodash';
import {
	OPEN_PANEL, CLOSE_PANEL, OPEN_POPUP, CLOSE_POPUP,
	REQUEST_INITIAL_STATE, INVALID_RESPONSE
} from '../common/actions/runtime';
import {IFRAME_FILE} from '../container/api/iframe';
import {openWindow} from './api/windows';
import {fetchCurrentTab, closeTab} from './api/tabs';
import {get as getOption} from '../common/api/options';
import {setReferenceVersion} from '../common/actions/reference';
import createInstancePool from './createInstancePool';
import createAppInstance from './createAppInstance';



/**
 *	A map of open instances, indexed by tab id.
 */
const instances = createInstancePool();

/**
 *
 */
const openPanel = (id) => {
	// creates an instance and indexes it on the tab id.
	const instance = createAppInstance(id);
	instances.set(id, instance);

	// opens the panel and loads initial data.
	instance
		.sendMessage({
			type: OPEN_PANEL
		})
		.then(() =>
			getOption('reference')
		)
		.then((version = '3') =>
			instance.dispatch(setReferenceVersion(version))
		);
};

/**
 *
 */
const closePanel = (id) => {
	instances
		.get(id)
		.sendMessage({
			type: CLOSE_PANEL
		})
		.then(() =>
			instances.unset(id)
		);
};

/**
 *
 */
const handleMessage = (message, tabId) => {
	const instance = instances.get(tabId);

	if (!instance) {
		return INVALID_RESPONSE;
	}

	switch (message.type) {
		// sends the store's state to the instance.
		case REQUEST_INITIAL_STATE:
			return instance.store.getState();

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
					instances.set(id, instance);
					instances.unset(tabId);
				});
			}
			break;

		// if the instance runs in a popup, desindexes it and
		// closes it.
		case CLOSE_POPUP:
			if (instance.isPopup()) {
				const id = instance.switchToTab();
				instances.set(id, instance);
				instances.unset(tabId);
				closeTab(tabId);
			}
			break;

		// broadcasts message
		default:
			instance.sendMessage(message);
			break;
	}
};

/**
 *	Asks the content script to toggle the extension's container
 *	when one clicks the extension icon in the browser UI.
 */
chrome.browserAction.onClicked.addListener(() =>
	fetchCurrentTab().then((id) => {
		if (instances.has(id)) {
			closePanel(id);
		} else {
			openPanel(id);
		}
	})
);

/**
 *	Dispatches every message to the content scripts, allowing
 *	content scripts to talk to each other.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const tabId = sender.tab && sender.tab.id;
	const response = handleMessage(message, tabId);

	sendResponse(response);
});

/**
 *	Removes associated data when a tab is closed.
 */
chrome.tabs.onRemoved.addListener((id) => {
	instances.unset(id);
});
