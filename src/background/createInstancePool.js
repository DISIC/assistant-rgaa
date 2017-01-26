import {has, get, set, unset} from 'lodash';



/**
 *
 */
export default function createInstancePool() {
	const instances = {};

	//
	const dispatch = (action) =>
		instances.forEach((instance) =>
			instance.dispatch(action)
		);

	return {
		has: has.bind(null, instances),
		get: get.bind(null, instances),
		set: set.bind(null, instances),
		unset: unset.bind(null, instances),
		dispatch
	};
}
