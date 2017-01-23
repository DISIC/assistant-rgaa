import * as reference from '../common/sagas/reference';
import * as imports from '../common/sagas/imports';
import * as options from '../common/sagas/options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		imports.watchApply(),
		options.watchOpen(),
		reference.watchSetReferenceVersion()
	];
}
