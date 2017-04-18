import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {sendMessage} from '../api/runtime';
import {OPEN_POPUP, CLOSE_POPUP} from '../actions/runtime';
import {applyAllHelpers, revertAllHelpers} from '../actions/helpers';
import {SET_POSITION, OPEN, CLOSE} from '../actions/panel';
import {Position} from '../api/panel';



/**
 *	Opens or closes a popup window depending on the dock position.
 */
export function* setPositionWorker({payload: position}) {
	sendMessage({
		type: (position === Position.popup)
			? OPEN_POPUP
			: CLOSE_POPUP
	});
}

/**
 *
 */
export function* openWorker() {
	yield put(applyAllHelpers());
}

/**
 *
 */
export function* closeWorker() {
	yield put(revertAllHelpers());
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
export function* watchOpen() {
	yield* takeEvery(OPEN, openWorker);
}

/**
 *
 */
export function* watchClose() {
	yield* takeEvery(CLOSE, closeWorker);
}
