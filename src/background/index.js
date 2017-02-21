import {get} from 'lodash';
import {
	OPEN_PANEL, CLOSE_PANEL, OPEN_POPUP, CLOSE_POPUP,
	REQUEST_INITIAL_STATE, GET_PIXEL, GET_CURRENT_TAB,
	INVALID_RESPONSE
} from '../common/actions/runtime';
import {IFRAME_FILE} from '../container/api/iframe';
import {openWindow} from './api/windows';
import {fetchCurrentTab, captureVisibleTab, closeTab} from './api/tabs';
import {createMessageHandler} from '../common/api/runtime';
import {getOption} from '../common/api/options';
import {getPixelAt} from '../common/api/image';
import {setReferenceVersion} from '../common/actions/reference';
import createInstancePool from './createInstancePool';



/**
 *	A map of open instances, indexed by tab id.
 */
const instances = createInstancePool();

/**
 *
 */
const openPanel = (id) => {
	// creates an instance and indexes it on the tab id.
	const instance = instances.create(id);

	// opens the panel and loads initial data.
	instance
		.sendMessage({
			type: OPEN_PANEL
		})
		.then(() =>
			getOption('reference')
		)
		.then((version = '3-2016') =>
			instance.dispatch(setReferenceVersion(version))
		);
};

/**
 *
 */
const closePanel = (id) => {
	instances
		.getInstance(id)
		.sendMessage({
			type: CLOSE_PANEL
		})
		.then(() =>
			instances.removeInstance(id)
		);
};

/**
 *
 */
const handleUnknownInstanceMessage = (message) => {
	switch (message.type) {
		default:
			return INVALID_RESPONSE;
	}
};

/**
 *
 */
const handleKnownInstanceMessage = (message, tabId, instance) => {
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
					instances.switchToPopup(tabId, id);
				});
			}
			break;

		// if the instance runs in a popup, desindexes it and
		// closes it.
		case CLOSE_POPUP:
			if (instance.isPopup()) {
				instances.switchToTab(tabId);
				closeTab(tabId);
			}
			break;

		// sends the store's state to the instance.
		case GET_PIXEL:
			return captureVisibleTab()
				.then((image) =>
					getPixelAt(image, message.x, message.y)
				);

		// sends current tab's info to the instance.
		case GET_CURRENT_TAB:
			return fetchCurrentTab();

		// broadcasts message
		default:
			return instance.sendMessage(message);
	}
};

/**
 *	Asks the content script to toggle the extension's container
 *	when one clicks the extension icon in the browser UI.
 */
chrome.browserAction.onClicked.addListener(() =>
	fetchCurrentTab().then(({id}) => {
		if (instances.hasInstance(id)) {
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
chrome.runtime.onMessage.addListener(
	createMessageHandler((message, sender) => {
		const tabId = sender.tab && sender.tab.id;
		const instance = tabId
			? instances.getInstance(tabId)
			: instances.getOptionsInstance();

		return instance
			? handleKnownInstanceMessage(message, tabId, instance)
			: handleUnknownInstanceMessage(message);
	})
);

/**
 *	Removes associated data when a tab is closed.
 */
chrome.tabs.onRemoved.addListener((id) => {
	instances.removeInstance(id);
});
