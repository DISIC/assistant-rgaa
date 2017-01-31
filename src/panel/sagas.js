import * as panel from '../common/sagas/panel';
import * as imports from '../common/sagas/imports';
import * as tests from '../common/sagas/tests';



/**
 *
 */
export default function* sagas() {
	yield [
		panel.watchSetPosition(),
		imports.watchApply(),
		tests.watchEnable(),
		tests.watchDisable()
	];
}
