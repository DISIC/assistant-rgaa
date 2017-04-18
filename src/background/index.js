import {get, endsWith} from 'lodash';
import {
	OPEN_PANEL, CLOSE_PANEL, OPEN_POPUP, CLOSE_POPUP, VALIDATE_PAGE, VIEW_PAGE_SOURCE,
	REQUEST_INITIAL_STATE, GET_PIXEL, GET_CURRENT_TAB, CREATE_TAB,
	INVALID_RESPONSE
} from '../common/actions/runtime';
import {IFRAME_FILE} from '../container/api/container';
import {openWindow, getWindowTabId} from './api/windows';
import {OPTIONS_FILE} from './api/options';
import {
	CONTENT_STYLES, CONTENT_SCRIPTS, executeScript, insertCSS,
	fetchCurrentTab, captureVisibleTab, closeTab, createTab
} from './api/tabs';
import {createMessageHandler} from '../common/api/runtime';
import {getPixelAt} from '../common/api/image';
import {validateLocalPage} from '../common/api/validateLocalPage';
import {viewSource} from '../common/api/viewSource';
import {DEFAULT_VERSION, getReferenceOption} from '../common/api/reference';
import {setReferenceVersion} from '../common/actions/reference';
import {setPageInfo} from '../common/actions/panel';
import {applyAllHelpers, revertAllHelpers} from '../common/actions/helpers';
import {isFirefox, isChrome} from '../common/api/uasniffer';
import createInstancePool from './createInstancePool';



/**
 *	A map of open instances, indexed by tab id.
 */
const instances = createInstancePool();

/**
 *	Injects content styles and javascripts one after the other.
 */
const injectContentScripts = (tabId) =>
	[...CONTENT_STYLES, ...CONTENT_SCRIPTS].reduce(
		(promise, file) =>
			promise.then(() =>
				endsWith(file, '.css')
					? insertCSS(tabId, {file})
					: executeScript(tabId, {file})
			),
		Promise.resolve()
	);

/**
 *
 */
const openPanel = ({id}) => {
	const instance = instances.getInstance(id);
	instance.setOpen(true);
	instance.dispatch(applyAllHelpers());
	return instance.sendMessage({
		type: OPEN_PANEL
	});
};

/**
 *
 */
const closePanel = ({id}) => {
	const instance = instances.getInstance(id);
	instance.setOpen(false);
	instance.dispatch(revertAllHelpers());
	return instance.sendMessage({
		type: CLOSE_PANEL
	});
};

/**
 *
 */
const togglePanel = (tab) => {
	const instance = instances.getInstance(tab.id);
	return instance.isOpen()
		? closePanel(tab)
		: openPanel(tab);
};

/**
 *
 */
const createPanel = ({id, url, title}) => {
	const instance = instances.getInstance(id);
	openPanel({id})
		.then(() =>
			getReferenceOption()
		)
		.then((version = DEFAULT_VERSION) => {
			instance.dispatch(setReferenceVersion(version));
			instance.dispatch(setPageInfo({
				url,
				title
			}));
		});
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
				}).then((popup) => (
					getWindowTabId(popup)
				)).then((popupTabId) => {
					instances.switchToPopup(tabId, popupTabId);
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

		case VALIDATE_PAGE:
			return validateLocalPage(message.url);

		case VIEW_PAGE_SOURCE:
			return viewSource(message.url);

		// create a tab with the given url, next to the current tab
		case CREATE_TAB:
			return fetchCurrentTab().then(currentTab => (
				createTab({
					url: message.url,
					index: currentTab.index + 1
				})
			));

		case CLOSE_PANEL:
			return closePanel({id: tabId});

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
	fetchCurrentTab().then((tab) => {
		if (instances.hasInstance(tab.id)) {
			togglePanel(tab);
		}

		if (!instances.hasInstance(tab.id)) {
			const instance = instances.create(tab.id);
			// send an empty message, just to check if we have a response
			// if we have a response, it means there already is a content script loaded
			// and we don't need to load them again
			// if there is no response, we'll trigger an error, it means there is no
			// content script and we need to load them
			instance
				.sendMessage('')
				.then(() =>
					createPanel(tab)
				)
				.catch(() => {
					injectContentScripts(tab.id).then(() => {
						createPanel(tab);
					});
				});
		}
	})
);

/**
 *	Dispatches every message to the content scripts, allowing
 *	content scripts to talk to each other.
 */
chrome.runtime.onMessage.addListener(
	createMessageHandler((message, sender) => {
		const isOptionsPage = sender.url && sender.url.endsWith(OPTIONS_FILE);
		const tabId = sender.tab && sender.tab.id;
		const instance = !isOptionsPage
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



/**
 * reinject content scripts on page reload
 */
const onPageReload = (tabId, instance) =>
	injectContentScripts(tabId).then(() => (
		instance.isOpen()
			? openPanel({id: tabId})
			: closePanel({id: tabId})
	));

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (changeInfo.status === 'complete' && instances.hasInstance(tabId)) {
		// send an empty message, just to check if we have a response
		// if we have a response, it means there already is a content script loaded
		// and we don't need to load them again
		// if there is no response, we'll trigger an error, it means there is no
		// content script and we need to load them
		//
		// this check can seem unnecessary, but it is required because
		// chrome.tabs.onUpdated triggers more than on actual page reloads, especially on Chrome
		const instance = instances.getInstance(tabId);
		instance
			.sendMessage('')
			.then(response => {
				// firefox sometimes has a ['undefined'] response? this is weird
				// a response when scripst are actually loaded here is [{'message': 'ok'}]
				if (response && response.length === 1 && response[0] === undefined) {
					onPageReload(tabId, instance);
				}
			})
			.catch(() =>
				onPageReload(tabId, instance)
			);
	}
});
