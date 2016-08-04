import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {CONTAINER_ID} from './api/iframe';
import AppContainer from './components/AppContainer';



/**
 *
 */
const container = document.createElement('div');
container.id = CONTAINER_ID;
document.body.appendChild(container);



/**
 *	Renders the application.
 */
render((
	<Provider store={store}>
		<AppContainer />
	</Provider>
), container);
