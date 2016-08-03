import React from 'react';
import {Router, Route, createMemoryHistory} from 'react-router';
import App from './components/App';
import {fetchTheme} from './actions/reference';


export default function (store) {
	const onThemeRoute = ({params}) => {
		store.dispatch(fetchTheme(params.theme));
	};

	/**
	 * Application routes.
	 */
	return (
		<Router history={createMemoryHistory()}>
			<Route path="/" component={App}>
				<Route path="themes/:theme" onEnter={onThemeRoute} />
			</Route>
		</Router>
	);
}
