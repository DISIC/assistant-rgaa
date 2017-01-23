import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import messages from '../common/messages/fr';
import {OPEN_PANEL, CLOSE_PANEL} from '../common/actions/runtime';
import getStore from './getStore';
import {CONTAINER_ID} from './api/iframe';
import AppContainer from './components/AppContainer';



/**
 *
 */
addLocaleData(fr);

/**
 *	A DOM node containing the application.
 */
let container = null;

/**
 *	Renders the panel.
 */
const start = () => {
	container = document.createElement('div');
	container.id = CONTAINER_ID;
	document.body.appendChild(container);

	return getStore()
		.then((store) => (
			<Provider store={store}>
				<IntlProvider locale="fr" messages={messages}>
					<AppContainer />
				</IntlProvider>
			</Provider>
		))
		.then((app) =>
			render(app, container)
		);
};

/**
 *	Removes the panel from the page.
 */
const shutdown = () => {
	document.body.removeChild(container);
	container = null;
};

/**
 *
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	Promise.resolve(message)
		// eslint-disable-next-line consistent-return
		.then(({type}) => {
			// eslint-disable-next-line default-case
			switch (type) {
				case OPEN_PANEL:
					return start();

				case CLOSE_PANEL:
					return shutdown();
			}
		})
		.then(() =>
			sendResponse()
		);

	// Returning true states that sendResponse is asynchronous
	return true;
});
