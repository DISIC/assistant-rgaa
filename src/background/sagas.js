import * as container from '../common/sagas/container';
import * as options from '../common/sagas/options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestPopup(),
		options.watchOpen(),
		options.watchSetReference()
	];
}
