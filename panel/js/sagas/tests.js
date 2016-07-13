import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {send} from '../actions/messages';
import {APPLY_HELPERS, REVERT_HELPERS} from '../actions/tests';



/**
 *	Sends the given action to the extension's listeners.
 */
function* sendActionSaga({type, payload}) {
	yield put(send(type, payload));
}



/**
 *
 */
export function* watchApplyHelpers() {
	yield takeEvery(APPLY_HELPERS, sendActionSaga);
}

/**
 *
 */
export function* watchRevertHelpers() {
	yield takeEvery(REVERT_HELPERS, sendActionSaga);
}
