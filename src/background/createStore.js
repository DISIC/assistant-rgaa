import {createStore as createReduxStore, combineReducers, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import shareState from '../common/enhancers/shareState';
import {createGatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';
import {appReducers} from '../common/reducers';
import sagas from './sagas';



/**
 *
 */
export default function createStore(name, sharedStore, sendMessage) {
	const sagaMiddleware = createSagaMiddleware();
	const store = createReduxStore(
		combineReducers(appReducers),
		compose(
			applyMiddleware(
				createGatherMiddleware(name),
				sagaMiddleware,
				createBroadcastMiddleware(name, sendMessage)
			),
			shareState(sharedStore)
		)
	);

	sagaMiddleware.run(sagas);
	return store;
}
