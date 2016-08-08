import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../common/reducers';
import {createGatherMiddleware, createBroadcastMiddleware} from '../common/middlewares/sync';
import DevTools from './components/DevTools';



/**
 *	Creates the store with all the reducers and middlewares.
 */
const store = createStore(
	reducer,
	compose(
		applyMiddleware(
			createGatherMiddleware('devtools'),
			createBroadcastMiddleware('devtools')
		),
		DevTools.instrument()
	)
);



export default store;
