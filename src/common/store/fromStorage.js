import {keys} from 'lodash';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {getStoredState} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import chromeStorage from '../api/storage';
import {createGatherMiddleware, createBroadcastMiddleware} from '../middlewares/sync';



/**
 * create a store with initialState fetched from redux-persist given storage
 *
 * @param {string} name - Store name.
 * @param  {Object} reducers reducers to give to combineReducers
 * @param  {array} sagas sagas
 * @param  {Object} persistConfig (optional) redux-persist persistor config
 * @return {Promise} promise resolved with created store
 *					or rejected with stored state retrieval error
 */
export default function (name, reducers, sagas, persistConfig) {
	const config = {
		storage: chromeStorage,
		whitelist: keys(reducers),
		...persistConfig
	};

	return getStoredState(config).then(restoredState => {
		const sagaMiddleware = createSagaMiddleware();
		const store = createStore(
			combineReducers(reducers),
			restoredState,
			applyMiddleware(
				createGatherMiddleware(name),
				sagaMiddleware,
				createBroadcastMiddleware(name)
			)
		);

		sagaMiddleware.run(sagas);
		return store;
	});
}
