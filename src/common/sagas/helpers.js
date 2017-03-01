import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {ENABLE, DISABLE} from '../actions/tests';
import {APPLY, REVERT, applyHelpers, revertHelpers} from '../actions/helpers';
import * as helpersApi from '../../helpers/api/helpers';
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
function* enableTestSaga({payload: id}) {
	const helpers = yield select(getHelpersByTest, id);
	yield put(applyHelpers(id, helpers));
}

/**
 *
 */
function* disableTestSaga({payload: id}) {
	const helpers = yield select(getHelpersByTest, id);
	yield put(revertHelpers(id, helpers));
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
export function* watchEnableTest() {
	yield* takeEvery(ENABLE, enableTestSaga);
}

/**
 *
 */
export function* watchDisableTest() {
	yield* takeEvery(DISABLE, disableTestSaga);
}
