import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {APPLY} from '../actions/imports';
import {getVersion} from '../selectors/imports';
import {
	getInactiveThemeIds, getInactiveCriterionIds, getTestResults
} from '../selectors/reference';
import {setReferenceVersion} from '../actions/reference';



/**
 *
 */
function* applyWorker() {
	const importVersion = yield select(getVersion);
	if (importVersion) {
		yield put(setReferenceVersion(importVersion));

		const inactiveThemes = yield select(getInactiveThemeIds);
		const inactiveCriteria = yield select(getInactiveCriterionIds);
		const testResults = yield select(getTestResults);
		console.log(inactiveThemes, inactiveCriteria, testResults);
	}
}

/**
 *
 */
export function* watchApply() {
	yield* takeEvery(APPLY, applyWorker);
}
