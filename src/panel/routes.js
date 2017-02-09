import React from 'react';
import {Router, Route, IndexRoute, createMemoryHistory} from 'react-router';
import App from './components/App';
import ReferencePageContainer from './components/ReferencePageContainer';
import ImportPageContainer from './components/ImportPageContainer';



/**
 * Application routes.
 */
export default function () {
	return (
		<Router history={createMemoryHistory()}>
			<Route path="/" component={App}>
				<IndexRoute component={ReferencePageContainer} />

				<Route
					path="import"
					component={ImportPageContainer}
				/>
			</Route>
		</Router>
	);
}
