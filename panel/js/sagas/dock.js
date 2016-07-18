import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {send} from '../actions/messages';
import {SET_POSITION, TOGGLE_POPUP} from '../actions/dock';



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
	yield* takeEvery(SET_POSITION, sendDockSaga);
}

/**
 *
 */
export function* watchSetPopupMode() {
	yield* takeEvery(TOGGLE_POPUP, sendDockSaga);
}
