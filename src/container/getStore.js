import createStore from '../common/createStore';
import reducer from '../common/reducers';
import getInitialState from '../common/store/getInitialState';


/**
 *
 */
export default function getStore() {
console.log(getInitialState)
console.trace()
	return getInitialState().then((state) =>
		createStore('container', reducer, undefined, state)
	);
}
