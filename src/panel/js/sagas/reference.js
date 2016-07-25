import {property} from 'lodash';
import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {getTheme} from '../api/reference';
import {FETCH_THEME, setCurrentTheme} from '../actions/reference';



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
export function* watchFetch() {
	yield* takeEvery(FETCH_THEME, fetchThemeWorker);
}
