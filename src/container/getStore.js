import createStore from '../common/createStore';
import reducer from '../common/reducers';
import getInitialState from '../common/store/getInitialState';


/**
 *
 */
export default function getStore() {
	return getInitialState().then((state) =>
		createStore('container', reducer, undefined, state)
	);
}
