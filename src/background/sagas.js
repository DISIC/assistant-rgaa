import * as container from '../common/sagas/container';
import * as reference from '../common/sagas/reference';
import * as options from '../common/sagas/options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestPopup(),
		options.watchOpen(),
		reference.watchSetReferenceVersion()
	];
}
