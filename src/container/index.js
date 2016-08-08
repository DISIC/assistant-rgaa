import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import messages from '../common/messages/fr';
import store from './store';
import {CONTAINER_ID} from './api/iframe';
import AppContainer from './components/AppContainer';



/**
 *
 */
const container = document.createElement('div');
container.id = CONTAINER_ID;
document.body.appendChild(container);


addLocaleData(fr);

/**
 *	Renders the application.
 */
render((
	<Provider store={store}>
		<IntlProvider locale="fr" messages={messages}>
			<AppContainer />
		</IntlProvider>
	</Provider>
), container);
