import {createStore, combineReducers} from 'redux';
import {property} from 'lodash';
import shareState from './shareState';



/**
 *
 */
describe('shareState', function() {

	const UPDATE_REDUCER = 'UPDATE_REDUCER';
	const UPDATE_SHARED_REDUCER = 'UPDATE_SHARED_REDUCER';

	const initialState = {
		value: 0
	};

	const reducer = (state = initialState, {type, payload}) => {
		switch (type) {
			case UPDATE_REDUCER:
				return {
					value: payload
				};

			default:
				return state;
		}
	};

	const sharedReducer = (state = initialState, {type, payload}) => {
		switch (type) {
			case UPDATE_SHARED_REDUCER:
				return {
					value: payload
				};

			default:
				return state;
		}
	};

	const getSharedValue = property('sharedReducer.value');
	const getValue = property('reducer.value');

	/**
	 *
	 */
	it('should share data between stores', function() {
		const sharedStore = createStore(combineReducers({sharedReducer}));
		const store1 = createStore(combineReducers({reducer}), shareState(sharedStore));
		const store2 = createStore(combineReducers({reducer}), shareState(sharedStore));

		store1.dispatch({
			type: UPDATE_REDUCER,
			payload: 1
		});

		expect(getSharedValue(store1.getState())).to.equal(0);
		expect(getValue(store1.getState())).to.equal(1);
		expect(getSharedValue(store2.getState())).to.equal(0);
		expect(getValue(store2.getState())).to.equal(0);

		store1.dispatch({
			type: UPDATE_SHARED_REDUCER,
			payload: 2
		});

		expect(getSharedValue(store1.getState())).to.equal(2);
		expect(getValue(store1.getState())).to.equal(1);
		expect(getSharedValue(store2.getState())).to.equal(2);
		expect(getValue(store2.getState())).to.equal(0);

		store2.dispatch({
			type: UPDATE_SHARED_REDUCER,
			payload: 3
		});

		expect(getSharedValue(store1.getState())).to.equal(3);
		expect(getValue(store1.getState())).to.equal(1);
		expect(getSharedValue(store2.getState())).to.equal(3);
		expect(getValue(store2.getState())).to.equal(0);

		expect(store1.getState()).to.deep.equal({
			sharedReducer: {
				value: 3
			},
			reducer: {
				value: 1
			}
		});

		expect(store2.getState()).to.deep.equal({
			sharedReducer: {
				value: 3
			},
			reducer: {
				value: 0
			}
		});
	});

	/**
	 *
	 */
	it('should notify subscribers when shared data changes', function(done) {
		const sharedStore = createStore(combineReducers({sharedReducer}));
		const store1 = createStore(combineReducers({reducer}), shareState(sharedStore));
		const store2 = createStore(combineReducers({reducer}), shareState(sharedStore));

		store2.subscribe(done);
		store1.dispatch({
			type: UPDATE_SHARED_REDUCER,
			payload: 2
		});
	});
});
