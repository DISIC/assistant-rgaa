import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {send} from '../../../common/actions/messages';
import {send as syncedActions} from '../sync/actions';



/**
 *	Sends the given action to the extension's listeners.
 */
function* sendActionSaga({type, payload}) {
	yield put(send(type, payload));
}



/**
 *
 */
export function* watchSyncedActions() {
	yield* takeEvery(syncedActions, sendActionSaga);
}
