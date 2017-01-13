import React from 'react';
import {Router, Route, createMemoryHistory} from 'react-router';
import * as themesActions from '../common/actions/themes';
import AppContainer from './components/AppContainer';


export default function (store) {
	const onThemeRoute = ({params}) => {
		store.dispatch(themesActions.setCurrent(params.theme));
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
