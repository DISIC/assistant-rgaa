import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {create as createWindow, remove as removeWindow} from '../api/windows';
import {IFRAME_FILE} from '../../container/api/iframe';
import {SET_POSITION, TOGGLE_POPUP, setPopup} from '../../common/actions/container';
import {getPopupWindowId} from '../../common/selectors/container';



/**
 *	Closes the popup, if any, when a position change is requested.
 */
export function* setPositionWorker() {
	const popupWindowId = yield select(getPopupWindowId);

	if (popupWindowId) {
		yield call(removeWindow, popupWindowId);
		yield put(setPopup(null));
	}
}

/**
 *
 */
export function* togglePopupWorker() {
	const popupWindowId = yield select(getPopupWindowId);

	if (popupWindowId) {
		yield call(removeWindow, popupWindowId);
		yield put(setPopup(null));
	} else {
		const popupWindow = yield call(createWindow, {
			url: chrome.runtime.getURL(IFRAME_FILE),
			type: 'popup'
		});

		yield put(setPopup(popupWindow.id));
	}
}



/**
 *
 */
export function* watchSetPosition() {
	yield* takeEvery(SET_POSITION, setPositionWorker);
}

/**
 *
 */
export function* watchRequestPopup() {
	yield* takeEvery(TOGGLE_POPUP, togglePopupWorker);
}
