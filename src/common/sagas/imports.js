import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {getVersion, findTestResults} from '../selectors/imports';
import {setReferenceVersion} from '../actions/reference';
import {APPLY, setTestsResults} from '../actions/imports';



/**
 *
 */
function* applyWorker() {
	const importVersion = yield select(getVersion);

	if (!importVersion) {
		return;
	}

	yield put(setReferenceVersion(importVersion));
	const testResults = yield select(findTestResults);
	yield put(setTestsResults(testResults));
}

/**
 *
 */
export function* watchApply() {
	yield* takeEvery(APPLY, applyWorker);
}
