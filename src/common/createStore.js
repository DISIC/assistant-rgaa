import {createStore as createReduxStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createGatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';



/**
 *
 */
export default function createStore(
	name,
	reducer,
	saga,
	initialState = {},
	sendMessage = undefined
) {
	const sagaMiddleware = createSagaMiddleware();
	const store = createReduxStore(
		reducer,
		initialState,
		applyMiddleware(
			createGatherMiddleware(name),
			sagaMiddleware,
			createBroadcastMiddleware(name, sendMessage)
		)
	);

	if (saga) {
		sagaMiddleware.run(saga);
	}

	return store;
}
