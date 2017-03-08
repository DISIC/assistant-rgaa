import getInitialState from '../common/store/getInitialState';
import createStore from '../common/createStore';
import reducer from '../common/reducers';
import sagas from './sagas';



/**
 *
 */
getInitialState()
	.then((state) =>
		createStore('helpers', reducer, sagas, state)
	);
