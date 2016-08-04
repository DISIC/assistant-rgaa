import store, {persistor} from './store';
import {fetchCurrentTab, sendToContent} from './api/tabs';
import {get as getOption} from '../common/api/options';
import {setReferenceVersion} from '../common/actions/reference';
import {setCurrent as setCurrentTab} from '../common/actions/tabs';
import {toggle} from '../common/actions/container';
import {isOpen} from '../common/selectors/container';


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
	fetchCurrentTab().then((tabId) => {
		// empty cached store from chrome storage to have some sort of "session storage"
		persistor.purgeAll();

		// restore reference from options if we want to open the panel
		if (!isOpen(store.getState())) {
			restoreReference();
		}

		store.dispatch(setCurrentTab(tabId));
		store.dispatch(toggle());
	});
});

