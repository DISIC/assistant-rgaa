import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index';
import sagas from './sagas';
import {gatherMiddleware, createBroadcastMiddleware} from '../../common/middlewares/sync';



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
		gatherMiddleware,
		sagaMiddleware,
		createBroadcastMiddleware()
	)
);

/**
 *	Runs all sagas of the application.
 */
sagaMiddleware.run(sagas);



export default store;
