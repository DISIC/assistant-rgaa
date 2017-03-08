import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {APPLY, REVERT} from '../actions/helpers';
import * as helpersApi from '../../helpers/api/helpers';



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
export function* watchApply() {
	yield* takeEvery(APPLY, applySaga);
}

/**
 *
 */
export function* watchRevert() {
	yield* takeEvery(REVERT, revertSaga);
}
