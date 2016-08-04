import {property} from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {save} from '../api/options';
import {getTheme, getReference} from '../api/reference';
import {getHelpers} from '../api/helpers';
import {
	SET_REFERENCE_VERSION, FETCH_THEME, ENABLE_TEST, DISABLE_TEST,
	setReference, setCurrentTheme
} from '../actions/reference';
import {setHelpers, applyHelpers, revertHelpers} from '../actions/helpers';
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
function* setReferenceVersionWorker({payload: {version}}) {
	const data = yield call(getReference, version);
	yield put(setReference(data));
	yield put(setHelpers(getHelpers(version)));
	yield call(save, 'reference', version);
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
export function* watchSetReferenceVersion() {
	yield* takeEvery(SET_REFERENCE_VERSION, setReferenceVersionWorker);
}

