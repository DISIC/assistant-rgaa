import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {create as createWindow} from '../api/windows';
import {IFRAME_FILE} from '../../content/js/api/iframe';
import {REQUEST_POPUP, setPopup} from '../../common/actions/container';
import {getPopupWindowId} from '../../common/selectors/container';



/**
 *
 */
export function* requestPopupWorker() {
	const popupWindowId = yield select(getPopupWindowId);
	if (popupWindowId) {
		yield call(chrome.windows.remove, popupWindowId); // eslint-disable-line no-undef
		yield put(setPopup(null));
	} else {
		const popupWindow = yield call(createWindow, {
			url: chrome.runtime.getURL(IFRAME_FILE), // eslint-disable-line no-undef
			type: 'popup'
		});
		yield put(setPopup(popupWindow.id));
	}
}



/**
 *
 */
export function* watchRequestPopup() {
	yield* takeEvery(REQUEST_POPUP, requestPopupWorker);
}
