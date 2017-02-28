import {REDUX_ACTION} from '../common/actions/runtime';
import {APPLY, REVERT} from '../common/actions/helpers';
import {applyHelpers, revertHelpers} from './api/helpers';
import getInitialState from '../common/store/getInitialState';
import createStore from '../common/createStore';
import reducer from '../common/reducers';
import {getEnabled} from '../common/selectors/tests';
import {enable} from '../common/actions/tests';
import sagas from './sagas';



/**
 *
 */
const handleAction = ({type, payload}) => {
	// eslint-disable-next-line default-case
	switch (type) {
		case APPLY:
			applyHelpers(payload.id, payload.helpers);
			break;

		case REVERT:
			revertHelpers(payload.id, payload.helpers);
			break;
	}
};

/**
 *
 */
chrome.runtime.onMessage.addListener(({type, action}) => {
	if (type === REDUX_ACTION) {
		handleAction(action);
	}
});



/**
 * If there is a state at load, it means we reloaded a tab with the panel opened.
 * Directly apply tests if any.
 */
const createHelpersStore = (state) =>
	createStore('helpers', reducer, sagas, state);

const applyInitialTests = (store) => {
	const tests = getEnabled(store.getState());
	tests.forEach(({id}) =>
		store.dispatch(enable(id))
	);
};

getInitialState()
	.then(createHelpersStore)
	.then(applyInitialTests)
	.catch(() => {});
