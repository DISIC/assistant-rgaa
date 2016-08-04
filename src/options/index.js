import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import messages from '../common/messages/fr';
import getStore from './getStore';
import App from './components/App';



addLocaleData(fr);

getStore().then((store) => {
	/**
	 *	Renders the application.
	 */
	render((
		<Provider store={store}>
			<IntlProvider locale="fr" messages={messages}>
				<App />
			</IntlProvider>
		</Provider>
	), document.getElementById('options'));
});
