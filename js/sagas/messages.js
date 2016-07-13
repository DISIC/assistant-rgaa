import {takeEvery} from 'redux-saga';
import {SEND} from '../actions/messages';



/**
 *
 */
function* sendSaga({payload}) {
	console.log(payload);
	chrome.runtime.sendMessage(payload); // eslint-disable-line no-undef
}



/**
 *
 */
export function* watchSend() {
	yield takeEvery(SEND, sendSaga);
}
