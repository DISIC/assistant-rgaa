import {property} from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import chromeStorage from '../api/storage';
import {getTheme} from '../api/reference';
import {
	SET_REFERENCE, FETCH_THEME, ENABLE_TEST, DISABLE_TEST, setCurrentTheme
} from '../actions/reference';
import {applyHelpers, revertHelpers} from '../actions/helpers';
import {getHelpersByTest} from '../selectors/helpers';



/**
 *
 */
function* fetchThemeWorker({payload: {id}}) {
	const reference = yield select(property('reference.data'));
	const themeData = yield call(getTheme, id, reference);
	yield put(setCurrentTheme(themeData));
}

/*
 *
 */
function* toggleTestWorker(enable, {payload: {id}}) {
	const helpers = yield select(getHelpersByTest, id);
	yield put(enable
		? applyHelpers(id, helpers)
		: revertHelpers(id, helpers)
	);
}

/*
 *
 */
function* setReferenceWorker({payload: {data}}) {
	yield call(chromeStorage.setItem, 'options.reference', data.version);
}



/**
 *
 */
export function* watchFetch() {
	yield* takeEvery(FETCH_THEME, fetchThemeWorker);
}

/**
 *
 */
export function* watchEnableTest() {
	yield* takeEvery(ENABLE_TEST, toggleTestWorker, true);
}

/**
 *
 */
export function* watchDisableTest() {
	yield* takeEvery(DISABLE_TEST, toggleTestWorker, false);
}

/**
 *
 */
export function* watchSetReference() {
	yield* takeEvery(SET_REFERENCE, setReferenceWorker);
}

