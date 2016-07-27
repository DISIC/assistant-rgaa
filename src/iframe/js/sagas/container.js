import {takeEvery} from 'redux-saga';
import {put, call, select} from 'redux-saga/effects';
import {toggle, REQUEST_TOGGLE, SET_POSITION, SET_POPUP} from '../../../common/actions/container';
import {getPosition, getOpenIntent, getPopupWindowId} from '../../../common/selectors/container';
import {show, setPosition, isCreated, create, hide} from '../api/iframe';



/**
 *
 */
export function* setPositionWorker() {
	const position = yield select(getPosition);
	yield call(setPosition, position);
}

/**
 *
 */
export function* requestToggleWorker() {
	const openIntent = yield select(getOpenIntent);
	if (!isCreated()) {
		yield call(create);
	}
	yield call(openIntent ? show : hide);
	yield put(toggle());
}

/**
 *
 */
export function* setPopupWorker() {
	const popup = yield select(getPopupWindowId);
	yield call(popup ? hide : show);
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
export function* watchRequestToggle() {
	yield* takeEvery(REQUEST_TOGGLE, requestToggleWorker);
}

/**
 *
 */
export function* watchSetPopup() {
	yield* takeEvery(SET_POPUP, setPopupWorker);
}
