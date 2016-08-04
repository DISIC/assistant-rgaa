import {createStore, applyMiddleware} from 'redux';
import reducer from '../common/reducers';
import {createGatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';



/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	applyMiddleware(
		createGatherMiddleware('container'),
		createBroadcastMiddleware('container')
	)
);



export default store;
