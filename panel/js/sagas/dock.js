import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {send} from '../actions/messages';
import {SET_POSITION} from '../actions/dock';



/**
 *	Sends the given action to the extension's listeners.
 */
function* sendDockSaga({type, payload}) {
	yield put(send(type, payload));
}



/**
 *
 */
export function* watchSetPosition() {
	yield takeEvery(SET_POSITION, sendDockSaga);
}
