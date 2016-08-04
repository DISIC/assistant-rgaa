import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import getStore from './getStore';
import AppContainer from './components/AppContainer';



getStore().then((store) => {
	/**
	 *	Renders the application.
	 */
	render((
		<Provider store={store}>
			<AppContainer />
		</Provider>
	), document.getElementById('options'));
});
