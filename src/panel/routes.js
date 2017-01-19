import React from 'react';
import {Router, Route, IndexRoute, createMemoryHistory} from 'react-router';
import * as themesActions from '../common/actions/themes';
import App from './components/App';
import ReferencePageContainer from './components/ReferencePageContainer';
import ImportPageContainer from './components/ImportPageContainer';



/**
 * Application routes.
 */
export default function (store) {
	const onThemeRoute = ({params}) => {
		store.dispatch(themesActions.setCurrent(params.theme));
	};

	return (
		<Router history={createMemoryHistory()}>
			<Route path="/" component={App}>
				<IndexRoute component={ReferencePageContainer} />

				<Route
					path="themes/:theme"
					component={ReferencePageContainer}
					onEnter={onThemeRoute}
				/>

				<Route
					path="import"
					component={ImportPageContainer}
				/>
			</Route>
		</Router>
	);
}
