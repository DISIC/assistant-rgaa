import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './reducers';
import {createGatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';



/**
 *	Creates middlewares.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	applyMiddleware(
		createGatherMiddleware('helpers'),
		sagaMiddleware,
		createBroadcastMiddleware('helpers')
	)
);

/**
 *	Runs all sagas of the application.
 */
sagaMiddleware.run(sagas);



export default store;
