import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import chromeStorage from '../api/storage';
import {open} from '../../background/api/options';
import {OPEN} from '../actions/options';



/**
 *
 */
function* openWorker() {
	yield call(open);
}

/**
 *
 */
export function* watchOpen() {
	yield* takeEvery(OPEN, openWorker);
}
