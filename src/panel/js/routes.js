import React from 'react';
import {Router, Route, createMemoryHistory} from 'react-router';
import App from './components/App';



/**
 * Application routes.
 */
const routes = (
	<Router history={createMemoryHistory()}>
		<Route path="/" component={App} />
	</Router>
);



export default routes;
