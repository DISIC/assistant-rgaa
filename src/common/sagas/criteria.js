import {takeEvery} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {TOGGLE_CRITERION, openCriterion, closeCriterion} from '../actions/criteria';
import {isOpen as isCriterionOpen} from '../selectors/criteria';



/**
 *
 */
function* toggleCriterionWorker({payload}) {
	const isOpen = yield select(isCriterionOpen, payload);
	if (isOpen) {
		yield put(closeCriterion(payload));
	} else {
		yield put(openCriterion(payload));
	}
}



/**
 *
 */
export function* watchToggleCriterion() {
	yield* takeEvery(TOGGLE_CRITERION, toggleCriterionWorker);
}
