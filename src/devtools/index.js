import React from 'react';
import {render} from 'react-dom';
import store from './store';
import DevTools from './components/DevTools';



/**
 *
 */
render(
	<DevTools store={store} />,
	document.getElementById('devtools')
);
