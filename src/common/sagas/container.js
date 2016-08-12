import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {create as createWindow, remove as removeWindow} from '../../background/api/windows';
import {IFRAME_FILE} from '../../container/api/iframe';
import {SET_POSITION, TOGGLE_POPUP, TOGGLE, setPopup, togglePopup} from '../actions/container';
import {getPopupWindowId, isOpen} from '../selectors/container';



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
export function* toggleWorker() {
	const isAppOpen = yield select(isOpen);
	const popupWindowId = yield select(getPopupWindowId);

	// we we just said we wanted to close the app, but a popup is here
	// close the popup
	if (!isAppOpen && popupWindowId) {
		yield put(togglePopup(false));
	}
}

/**
 * toggle popup by checking if a popup window is set
 * or by checking the force prop if passed
 */
export function* togglePopupWorker({payload: {force}}) {
	const popupWindowId = yield select(getPopupWindowId);

	const remove = force === false || (force === undefined && popupWindowId);
	const create = force === true || (force === undefined && !popupWindowId);

	if (remove) {
		yield call(removeWindow, popupWindowId);
		yield put(setPopup(null));
	}

	if (create) {
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
export function* watchToggle() {
	yield* takeEvery(TOGGLE, toggleWorker);
}

/**
 *
 */
export function* watchTogglePopup() {
	yield* takeEvery(TOGGLE_POPUP, togglePopupWorker);
}
