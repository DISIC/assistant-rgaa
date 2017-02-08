import {createStore, applyMiddleware} from 'redux';
import {createGatherMiddleware, createBroadcastMiddleware} from './sync';



/**
 *
 */
describe('sync', function() {

	const UPDATE = 'UPDATE';

	const initialState = {
		value: 0
	};

	const reducer = (state = initialState, {type, payload}) => {
		switch (type) {
			case UPDATE:
				return {
					value: payload
				};

			default:
				return state;
		}
	};

	const listeners = [];

	const register = (listener) =>
		listeners.push(listener);

	const send = (message) =>
		listeners.forEach((listen) =>
			listen(message)
		);

	/**
	 *
	 */
	it('should sync actions between stores', function(done) {
		const store1 = createStore(reducer, applyMiddleware(
			createGatherMiddleware('store1', register),
			createBroadcastMiddleware('store1', send)
		));

		const store2 = createStore(reducer, applyMiddleware(
			createGatherMiddleware('store2', register),
			createBroadcastMiddleware('store2', send)
		));

		store1.subscribe(done);
		store2.dispatch({
			type: UPDATE,
			payload: 1
		});
	});
});
