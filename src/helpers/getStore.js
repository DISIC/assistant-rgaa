import createStore from '../common/createStore';
import reducer from '../common/reducers';
import getInitialState from '../common/store/getInitialState';
import sagas from './sagas';



/**
 *
 */
export default () =>
	getInitialState()
		.then((state) =>
			createStore('helpers', reducer, sagas, state)
		);
