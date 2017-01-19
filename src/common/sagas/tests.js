import {reject, map} from 'lodash';
import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {ENABLE, DISABLE, disable} from '../actions/tests';
import {applyHelpers, revertHelpers} from '../actions/helpers';
import {getEnabled} from '../selectors/tests';
import {getHelpersByTest} from '../selectors/helpers';



/**
 *
 */
function* enableSaga({payload: id}) {
	// disables previously enabled tests
	const enabled = yield select(getEnabled);
	const otherEnabled = reject(enabled, ['id', id]);

	yield map(otherEnabled, (test) =>
		put(disable(test.id))
	);

	const helpers = yield select(getHelpersByTest, id);
	yield put(applyHelpers(id, helpers));
}

/**
 *
 */
function* disableSaga({payload: id}) {
	const helpers = yield select(getHelpersByTest, id);
	yield put(revertHelpers(id, helpers));
}



/**
 *
 */
export function* watchEnable() {
	yield* takeEvery(ENABLE, enableSaga);
}

/**
 *
 */
export function* watchDisable() {
	yield* takeEvery(DISABLE, disableSaga);
}
