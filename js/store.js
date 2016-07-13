import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {identity} from 'lodash';
import reducer from './reducer';
import sagas from './sagas';



/**
 *	Tells if the redux dev tools should be enabled.
 */
const shouldSetupDevTools = (
	process.env.NODE_ENV !== 'production'
	&& window.devToolsExtension
);

/**
 *	Creates middlewares.
 */
const sagaMiddleware = createSagaMiddleware();
const devToolsMiddleware = shouldSetupDevTools
	? window.devToolsExtension()
	: identity;

/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	compose(
		applyMiddleware(sagaMiddleware),
		devToolsMiddleware
	)
);

/**
 *	Runs all sagas of the application.
 */
sagaMiddleware.run(sagas);



export default store;
