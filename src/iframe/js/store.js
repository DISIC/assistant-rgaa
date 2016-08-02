import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import {gatherMiddleware, createBroadcastMiddleware} from '../../common/middlewares/sync';



/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	applyMiddleware(
		gatherMiddleware,
		createBroadcastMiddleware()
	)
);



export default store;
