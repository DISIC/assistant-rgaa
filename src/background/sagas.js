import * as container from '../common/sagas/container';
import * as reference from '../common/sagas/reference';
import * as imports from '../common/sagas/imports';
import * as options from '../common/sagas/options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestPopup(),
		imports.watchApply(),
		options.watchOpen(),
		reference.watchSetReferenceVersion()
	];
}
