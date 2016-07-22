import {takeEvery} from 'redux-saga';
import {select} from 'redux-saga/effects';
import {SEND} from '../../common/actions/messages';
import {getCurrent as getCurrentTab} from '../selectors/tabs';



/**
 *	Sends a payload through the extension's runtime.
 */
function* sendSaga({payload}) {
	const currentTab = yield select(getCurrentTab);
	chrome.tabs.sendMessage(currentTab, payload); // eslint-disable-line no-undef
}



/**
 *
 */
export function* watchSend() {
	yield* takeEvery(SEND, sendSaga);
}
