import {getCurrent} from '../selectors/tabs';
import store from '../store';



/**
 *
 */
export const fetchCurrentTab = () => {
	const query = {
		active: true,
		currentWindow: true
	};

	return new Promise((resolve, reject) => { // eslint-disable-line no-new
		chrome.tabs.query(query, (tabs) => { // eslint-disable-line no-undef
			if (tabs.length) {
				resolve(tabs[0].id);
			} else {
				reject('No tab found');
			}
		});
	});
};

/*
 *
 */
export const sendMessageToTab = (tab, message) => {
	if (!tab) {
		return false;
	}
	return chrome.tabs.sendMessage(tab, message); // eslint-disable-line no-undef
};

/*
 *
 */
export const sendToContent = (action) => {
	if (!getCurrent(store.getState())) {
		return false;
	}
	return sendMessageToTab(getCurrent(store.getState()), action);
};
