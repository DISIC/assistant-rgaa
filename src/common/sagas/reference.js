import {property, omit, map} from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {save} from '../api/options';
import {getTheme, getReference} from '../api/reference';
import {getHelpers} from '../api/helpers';
import {
	SET_REFERENCE_VERSION, FETCH_THEME, ENABLE_TEST, DISABLE_TEST,
	setReference, setCurrentTheme, disableTest
} from '../actions/reference';
import {setHelpers, applyHelpers, revertHelpers} from '../actions/helpers';
import {resetResults as resetImportResults} from '../actions/imports';
import {reset as resetChecklist} from '../actions/checklist';
import {getEnabledTests} from '../selectors/reference';
import {getHelpersByTest} from '../selectors/helpers';



/**
 *
 */
function* fetchThemeWorker({payload: {id}}) {
	const reference = yield select(property('reference.data'));
	const themeData = yield call(getTheme, id, reference);
	yield put(setCurrentTheme(themeData));
}

/**
 *
 */
function* enableTestWorker({payload: {id}}) {
	// disables previously enabled tests
	const enabled = yield select(getEnabledTests);
	const otherEnabled = omit(enabled, id);

	yield map(otherEnabled, (_, test) =>
		put(disableTest(test))
	);

	const helpers = yield select(getHelpersByTest, id);
	yield put(applyHelpers(id, helpers));
}

/**
 *
 */
function* disableTestWorker({payload: {id}}) {
	const helpers = yield select(getHelpersByTest, id);
	yield put(revertHelpers(id, helpers));
}

/**
 *
 */
function* setReferenceVersionWorker({payload: {version}}) {
	const data = yield call(getReference, version);
	const helpers = yield call(getHelpers, version);

	yield put(resetImportResults());
	yield put(resetChecklist());
	yield put(setReference(data));
	yield put(setHelpers(helpers));
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
	yield* takeEvery(ENABLE_TEST, enableTestWorker);
}

/**
 *
 */
export function* watchDisableTest() {
	yield* takeEvery(DISABLE_TEST, disableTestWorker);
}

/**
 *
 */
export function* watchSetReferenceVersion() {
	yield* takeEvery(SET_REFERENCE_VERSION, setReferenceVersionWorker);
}

