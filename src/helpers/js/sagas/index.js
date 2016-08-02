import * as helpers from './helpers';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		helpers.watchApply(),
		helpers.watchRevert()
	];
}
