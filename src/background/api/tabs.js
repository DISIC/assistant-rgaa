import {get} from 'lodash';
import {getCurrent} from '../../common/selectors/tabs';
import {getPopupWindowId} from '../../common/selectors/container';
import store from '../store';
import {get as getWindowDetails} from './windows';



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
		chrome.tabs.query(query, (tabs) => (
			tabs.length
				? resolve(tabs[0].id)
				: reject('No tab found')
		))
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
	const state = store.getState();
	const current = getCurrent(state);
	const popupId = getPopupWindowId(state);

	if (current) {
		sendMessageToTab(current, action);
	}

	if (popupId) {
		getWindowDetails(popupId)
			.then(popupWindow => {
				const popupTab = get(popupWindow, 'tabs[0].id', null);
				if (popupTab) {
					sendMessageToTab(popupTab, action);
				}
			})
			.catch(() => {
				// window was not found - nothing to do here
				// meaning we tried to pass a message between the moment
				// the window has been closed by the user and the moment
				// the redux state was updated
			});
	}
};
