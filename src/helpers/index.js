import getInitialState from '../common/store/getInitialState';
import {applyAllHelpers} from '../common/actions/helpers';
import {isOpen} from '../common/selectors/panel';
import createStore from '../common/createStore';
import reducer from '../common/reducers';
import sagas from './sagas';



/**
 *
 */
getInitialState()
	.then((state) => {
		const store = createStore('helpers', reducer, sagas, state);
		if (isOpen(state)) {
			store.dispatch(applyAllHelpers());
		}
		return store;
	});
