import store from './store';
import {fetchCurrentTab} from './api/tabs';
import {setCurrent as setCurrentTab} from './actions/tabs';
import {requestToggle} from '../common/actions/container';
import {handleContentMessages} from './sync';



/**
 * 	the background script is tasked with:
 * 		- sending the "toggle panel" request on the extension icon click
 * 		- dispatching messages across the whole extension
 */

/**
 *	Asks the content script to toggle the extension's container
 *	when we click the extension icon in browser UI
 */
chrome.browserAction.onClicked.addListener(() => { // eslint-disable-line no-undef
	fetchCurrentTab().then((tabId) => {
		store.dispatch(setCurrentTab(tabId));
		store.dispatch(requestToggle());
	});
});

handleContentMessages();
