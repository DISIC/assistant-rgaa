import {takeEvery} from 'redux-saga';
import {SEND} from '../actions/messages';



/**
 *	Sends a payload through the extension's runtime.
 */
function* sendSaga({payload}) {
	chrome.runtime.sendMessage(payload);
}



/**
 *
 */
export function* watchSend() {
	yield takeEvery(SEND, sendSaga);
}
