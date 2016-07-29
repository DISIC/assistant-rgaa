import {takeEvery} from 'redux-saga';
import {call} from 'redux-saga/effects';
import {open} from '../api/options';
import {OPEN} from '../../common/actions/options';



/**
 *
 */
function* openWorker() {
	console.log('oazpdazd');
	yield call(open);
}



/**
 *
 */
export function* watchOpen() {
	yield* takeEvery(OPEN, openWorker);
}
