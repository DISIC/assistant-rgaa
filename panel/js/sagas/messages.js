import {takeEvery} from 'redux-saga';
import {SEND} from '../actions/messages';



/**
 *	Sends a payload through the extension's runtime.
 */
function* sendSaga({payload}) {
	console.log(payload, chrome.runtime);
	chrome.runtime.sendMessage(null, payload); // eslint-disable-line no-undef
}



/**
 *
 */
export function* watchSend() {
	yield takeEvery(SEND, sendSaga);
}
