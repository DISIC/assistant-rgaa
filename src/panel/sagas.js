import {select, put} from 'redux-saga/effects';
import * as panel from '../common/sagas/panel';
import * as imports from '../common/sagas/imports';
import * as tests from '../common/sagas/tests';
import * as criteria from '../common/sagas/criteria';
import {enable} from '../common/actions/tests';
import {getEnabled} from '../common/selectors/tests';



/**
 *
 */
function* applyInitialTestsSaga() {
	const enabled = yield select(getEnabled);

	yield enabled.map(({id}) =>
		put(enable(id))
	);
}

/**
 *
 */
export default function* sagas() {
	yield [
		panel.watchSetPosition(),
		imports.watchApply(),
		tests.watchEnable(),
		tests.watchDisable(),
		criteria.watchToggleCriterion(),
		applyInitialTestsSaga()
	];
}
