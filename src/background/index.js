import store from './store';
import {create} from './api/windows';
import {fetchCurrentTab, sendToContent} from './api/tabs';
import storage from '../common/api/storage';
import {get as getOption} from '../common/api/options';
import {setReferenceVersion} from '../common/actions/reference';
import {setCurrent as setCurrentTab} from '../common/actions/tabs';
import {toggle, setPopup} from '../common/actions/container';
import {isOpen, getPopupWindowId} from '../common/selectors/container';
import {getCurrent as getCurrentTab} from '../common/selectors/tabs';



/**
 *
 */
window.rgaaExt = {
	store
};



const restoreReference = () =>
	getOption('reference').then(version => {
		if (version) {
			store.dispatch(setReferenceVersion(version));
		}
	});

restoreReference();



/**
 *	Opens a devtools popup in development mode.
 */
if (process.env.NODE_ENV !== 'production') {
	create({
		url: chrome.runtime.getURL('src/devtools/content.html'),
		type: 'popup'
	});
}



/**
 *	Dispatches every message to the content scripts, allowing
 *	content scripts to talk to each other.
 */
chrome.runtime.onMessage.addListener((message) =>
	sendToContent(message)
);

/**
 *	Asks the content script to toggle the extension's container
 *	when one clicks the extension icon in the browser UI.
 */
chrome.browserAction.onClicked.addListener(() => {
	let tab;
	fetchCurrentTab()
		.then((tabId) => {
			tab = tabId;
			// empty cached store from chrome storage to have some sort of "session storage"
			return storage.removeAllWithPrefix(storage.persistPrefix);
		})
		.then(() => {
			// restore reference from options if we want to open the panel
			if (!isOpen(store.getState())) {
				return restoreReference();
			}
			return true;
		})
		.then(() => {
			store.dispatch(setCurrentTab(tab));
			store.dispatch(toggle());
		});
});

/*
* let the app know when the user closed the popup window
*/
chrome.windows.onRemoved.addListener(removedWindowId => {
	const currentPopupId = getPopupWindowId(store.getState());
	if (currentPopupId === removedWindowId) {
		store.dispatch(setPopup(null));
		store.dispatch(toggle());
	}
});

/*
* let the app know when the user closed the current tab
*/
chrome.tabs.onRemoved.addListener((removedTabId) => {
	const state = store.getState();
	if (getCurrentTab(state) === removedTabId) {
		store.dispatch(setPopup(null));
	}
	if (getCurrentTab(state) === removedTabId && isOpen(state)) {
		store.dispatch(toggle());
	}
});
