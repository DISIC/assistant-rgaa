import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {
	getVersion, findInactiveThemeIds, findInactiveCriterionIds, findTestResults
} from '../selectors/imports';
import {setReferenceVersion} from '../actions/reference';
import {
	APPLY, setNonApplicableThemes, setNonApplicableCriteria, setTestsResults
} from '../actions/imports';



/**
 *
 */
function* applyWorker() {
	const importVersion = yield select(getVersion);
	if (importVersion) {
		yield put(setReferenceVersion(importVersion));

		const inactiveThemes = yield select(findInactiveThemeIds);
		const inactiveCriteria = yield select(findInactiveCriterionIds);
		const testResults = yield select(findTestResults);

		yield put(setNonApplicableThemes(inactiveThemes));
		yield put(setNonApplicableCriteria(inactiveCriteria));
		yield put(setTestsResults(testResults));
	}
}

/**
 *
 */
export function* watchApply() {
	yield* takeEvery(APPLY, applyWorker);
}
