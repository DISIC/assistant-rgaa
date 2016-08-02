import store from './store';
import {fetchCurrentTab, sendToContent} from './api/tabs';
import {setCurrent as setCurrentTab} from './actions/tabs';
import {requestToggle} from '../common/actions/container';



/**
 * 	the background script is tasked with:
 * 		- sending the "toggle panel" request on the extension icon click
 * 		- dispatching messages across the whole extension
 */



/**
 *	Dispatches every message to the content scripts, allowing
 *	content scripts to talk to each other.
 */
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message) =>
	sendToContent(message)
);

/**
 *	Asks the content script to toggle the extension's container
 *	when one clicks the extension icon in the browser UI.
 */
// eslint-disable-next-line no-undef
chrome.browserAction.onClicked.addListener(() => {
	fetchCurrentTab().then((tabId) => {
		store.dispatch(setCurrentTab(tabId));
		store.dispatch(requestToggle());
	});
});

