import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import {noop} from 'lodash';
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
	if (container) {
		container.style.display = '';
		return true;
	}

	return getStore().then((store) => {
		container = document.createElement('div');
		container.className = CONTAINER_ID;
		document.body.appendChild(container);

		render((
			<Provider store={store}>
				<IntlProvider locale="fr" messages={messages}>
					<AppContainer />
				</IntlProvider>
			</Provider>
		), container);
	}, noop);
};

/**
 *	Removes the panel from the page.
 */
const hide = () => {
	if (container) {
		container.style.display = 'none';
	}
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
					return hide();
			}
		})
		.then(() =>
			sendResponse({message: 'ok'})
		);

	// Returning true states that sendResponse is asynchronous
	return true;
});
