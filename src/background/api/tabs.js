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

	// eslint-disable-next-line no-new
	return new Promise((resolve, reject) =>
		chrome.tabs.query(query, (tabs) =>
			tabs.length
				? resolve(tabs[0].id)
				: reject('No tab found')
		)
	);
};

/**
 *
 */
export const sendMessageToTab = (tab, message) => {
	if (tab) {
		chrome.tabs.sendMessage(tab, message);
	}
};

/**
 *
 */
export const sendToContent = (action) => {
	const current = getCurrent(store.getState());

	if (current) {
		sendMessageToTab(current, action);
	}
};
