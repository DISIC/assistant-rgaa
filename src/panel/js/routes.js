import React from 'react';
import {Router, Route, createMemoryHistory} from 'react-router';
import App from './components/App';
import {fetchTheme} from './actions/reference';
import store from './store';



const onThemeRoute = ({params}) => {
	store.dispatch(fetchTheme(params.theme));
};

/**
 * Application routes.
 */
const routes = (
	<Router history={createMemoryHistory()}>
		<Route path="/" component={App}>
			<Route path="themes/:theme" onEnter={onThemeRoute} />
		</Route>
	</Router>
);

export default routes;
