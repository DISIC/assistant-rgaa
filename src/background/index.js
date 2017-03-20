import {get, endsWith} from 'lodash';
import {
	OPEN_PANEL, CLOSE_PANEL, OPEN_POPUP, CLOSE_POPUP, VALIDATE_PAGE, VIEW_PAGE_SOURCE,
	REQUEST_INITIAL_STATE, GET_PIXEL, GET_CURRENT_TAB, CREATE_TAB,
	INVALID_RESPONSE
} from '../common/actions/runtime';
import {IFRAME_FILE} from '../container/api/iframe';
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
import {revertAllHelpers} from '../common/actions/helpers';
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
const openPanel = ({id, url, title}) => {
	const instance = instances.getInstance(id);
	// opens the panel and loads initial data.
	instance
		.sendMessage({
			type: OPEN_PANEL
		})
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
const closePanel = ({id}) => {
	const instance = instances.getInstance(id);
	instance.dispatch(revertAllHelpers());
	instance
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
			closePanel(tab);
		}

		if (!instances.hasInstance(tab.id)) {
			instances.create(tab.id);
			injectContentScripts(tab.id).then(() => {
				openPanel(tab);
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
 * if we just reloaded the page and we had the toolbar loaded, reload it directly:
 * the "did the tab just reload" check is EXTREMELY FRAGILE here and, without a doubt, buggy
 * we do it like this, differently on Chrome and Firefox, because
 *  - Chrome triggers events when we internally change anchors in our panel iframe for some reason
 *  - Firefox does not trigger such events.
 *  - And anyway, they have different changeInfo objects for same things happening
 */
const previousUpdates = {};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	let hasReloaded = false;
	const previousStatus = get(previousUpdates, [tabId, 'changeInfo', 'status'], null);
	const previousUrl = get(previousUpdates, [tabId, 'changeInfo', 'url'], null);

	// I ended up seeing that, when loading a page, chrome has this timeline:
	// - trigger one event with changeInfo = {status: loading}. If it's the first time loading
	//   the page, there might be the url prop too
	// - trigger one or more event with changeInfo = {title: ...}, or {favIconUrl: ...},
	//   or other info, but no status or url
	// - trigger one event with changeInfo = {status: complete}
	// When changing anchor within our iframe, Chrome triggers like this:
	//  - one event with {status: loading}
	//  - one event with {status: complete}
	if (
		isChrome()
		&& changeInfo.status === 'complete'
		&& previousStatus === null
	) {
		hasReloaded = true;
	}

	// firefox does not trigger anything when doing stuff in our panel
	// when loading or reloading pages:
	// - {status: loading}
	// - when first loading a page, {favIconUrl: ...}, or {title: ...}, etc. This does not
	//   happen when reloading a page
	// - {status: loading, url: ...}
	// - {status: complete}
	if (
		isFirefox()
		&& changeInfo.status === 'complete'
		&& previousStatus === 'loading'
		&& previousUrl === tab.url
	) {
		hasReloaded = true;
	}

	if (hasReloaded && instances.hasInstance(tabId)) {
		injectContentScripts(tabId);
	}

	previousUpdates[tabId] = {tabId, changeInfo, tab};
});
