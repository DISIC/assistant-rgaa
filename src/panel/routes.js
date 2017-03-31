import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import memoryHistory from '../common/history';
import App from './components/App';
import ReferencePageContainer from './components/ReferencePageContainer';
import ImportPageContainer from './components/ImportPageContainer';
import HelpPage from './components/HelpPage';



/**
 * Application routes.
 */
export default function () {
	return (
		<Router history={memoryHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={ReferencePageContainer} />

				<Route path="import" component={ImportPageContainer} />
				<Route path="help" component={HelpPage} />
			</Route>
		</Router>
	);
}
