/**
 *	Wraps a store creator so the created store also dispatches
 *	actions to another store and merges their state.
 */
export default function shareState(sharedStore) {
	return (createStore) => (reducer, preloadedState, enhancer) => {
		const store = createStore(reducer, preloadedState, enhancer);

		const getState = () => ({
			...sharedStore.getState(),
			...store.getState()
		});

		const dispatch = (action) => {
			sharedStore.dispatch(action);
			store.dispatch(action);
		};

		const subscribe = (listener) => {
			sharedStore.subscribe(listener);
			store.subscribe(listener);
		};

		return {
			...store,
			getState,
			dispatch,
			subscribe
		};
	};
}
