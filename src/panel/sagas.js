import * as panel from '../common/sagas/panel';
import * as tests from '../common/sagas/tests';



/**
 *
 */
export default function* sagas() {
	yield [
		panel.watchSetPosition(),
		tests.watchEnable(),
		tests.watchDisable()
	];
}
