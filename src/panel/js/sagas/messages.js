import {takeEvery} from 'redux-saga';
import {SEND} from '../../../common/actions/messages';



/**
 *	Sends a payload through the extension's runtime.
 */
function* sendSaga({payload}) {
	chrome.runtime.sendMessage(payload); // eslint-disable-line no-undef
}



/**
 *
 */
export function* watchSend() {
	yield* takeEvery(SEND, sendSaga);
}
