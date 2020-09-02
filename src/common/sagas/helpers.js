import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {APPLY, APPLY_ALL, REVERT, REVERT_ALL, applyHelpers, revertHelpers} from '../actions/helpers';
import * as helpersApi from '../../helpers/api/helpers';
import {getEnabled} from '../selectors/tests';
import {getHelpersByTest} from '../selectors/helpers';



/**
 *
 */
function* applySaga({payload: {id, helpers}}) {
	yield call(helpersApi.applyHelpers, id, helpers);
}

/**
 *
 */
function* revertSaga({payload: {id, helpers}}) {
	yield call(helpersApi.revertHelpers, id, helpers);
}

/**
 *
 */
function* applyAllSaga() {
	const enabledTests = yield select(getEnabled);

	// eslint-disable-next-line no-restricted-syntax
	for (const test of enabledTests) {
		const helpers = yield select(getHelpersByTest, test.id);
		yield put(applyHelpers(test.id, helpers));
	}
}

/**
 *
 */
function* revertAllSaga() {
	const enabledTests = yield select(getEnabled);

	// eslint-disable-next-line no-restricted-syntax
	for (const test of enabledTests) {
		const helpers = yield select(getHelpersByTest, test.id);
		yield put(revertHelpers(test.id, helpers));
	}
}



/**
 *
 */
export function* watchApply() {
	yield* takeEvery(APPLY, applySaga);
}

/**
 *
 */
export function* watchRevert() {
	yield* takeEvery(REVERT, revertSaga);
}

/**
 *
 */
export function* watchApplyAll() {
	yield* takeEvery(APPLY_ALL, applyAllSaga);
}

/**
 *
 */
export function* watchRevertAll() {
	yield* takeEvery(REVERT_ALL, revertAllSaga);
}
