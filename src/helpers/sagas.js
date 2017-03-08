import * as helpers from '../common/sagas/helpers';



/**
 *
 */
export default function* sagas() {
	yield [
		helpers.watchApply(),
		helpers.watchRevert()
	];
}
