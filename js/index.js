import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import routes from './routes';
import store from './store';
import messages from './messages/fr';



/**
 *	Registers the default locale for react-intl.
 */
addLocaleData(fr);

/**
 *	Wraps the application with data and intl providers.
 */
const app = (
	<Provider store={store}>
		<IntlProvider locale="fr" messages={messages}>
			{routes}
		</IntlProvider>
	</Provider>
);

/**
 *	Renders the application on #app.
 */
render(app, document.getElementById('app'));
