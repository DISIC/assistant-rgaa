import {reject, map} from 'lodash';
import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {ENABLE, disable} from '../actions/tests';
import {getEnabled} from '../selectors/tests';



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
}

/**
 *
 */
export function* watchEnable() {
	yield* takeEvery(ENABLE, enableSaga);
}
