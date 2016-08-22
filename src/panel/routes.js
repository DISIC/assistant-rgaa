import React from 'react';
import {Router, Route, createMemoryHistory} from 'react-router';
import {fetchTheme} from '../common/actions/reference';
import AppContainer from './components/AppContainer';


export default function (store) {
	const onThemeRoute = ({params}) => {
		store.dispatch(fetchTheme(params.theme));
	};

	/**
	 * Application routes.
	 */
	return (
		<Router history={createMemoryHistory()}>
			<Route path="/" component={AppContainer}>
				<Route path="themes/:theme" onEnter={onThemeRoute} />
			</Route>
		</Router>
	);
}
