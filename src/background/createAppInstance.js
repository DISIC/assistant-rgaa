import createStore from '../common/createStore';
import reducer from '../common/reducers';
import {sendMessageToTab} from './api/tabs';
import sagas from './sagas';



/**
 *	Creates an app instance, i.e. a container for data associated
 *	with a particular tab.
 */
export default function createAppInstance(tabId) {
	let popupTabId = undefined;

	// deregisters the popup id and returns the original tab id.
	const switchToTab = () => {
		popupTabId = undefined;
		return tabId;
	};

	// Registers the popup id on which the instance runs.
	const switchToPopup = (id) => {
		popupTabId = id;
	};

	// Tells if the instance runs in a popup.
	const isPopup = () =>
		(popupTabId !== undefined);

	// Sends a message to the instance.
	const sendMessage = (message) => {
		// if the instance runs in a popup, dispatches the
		// message to the tab and the popup, so the interface
		// in the popup and the helpers in the tab get it.
		if (popupTabId) {
			return Promise.all([
				sendMessageToTab(tabId, message),
				sendMessageToTab(popupTabId, message)
			]);
		}

		// otherwise just sends the message to the tab.
		return sendMessageToTab(tabId, message);
	};

	const store = createStore(
		`background-${tabId}`,
		reducer,
		sagas,
		{},
		sendMessage
	);

	return {
		switchToTab,
		switchToPopup,
		isPopup,
		sendMessage,
		store,
		dispatch: store.dispatch
	};
}
