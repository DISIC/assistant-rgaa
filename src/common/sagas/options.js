import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import chromeStorage from '../api/storage';
import {open} from '../../background/api/options';
import {getReference} from '../api/reference';
import {setReference} from '../actions/reference';
import {OPEN, SET_REFERENCE_VERSION} from '../actions/options';



/**
 *
 */
function* openWorker() {
	yield call(open);
}

/*
 *
 */
function* setReferenceWorker({payload: {version}}) {
	yield call(chromeStorage.setItem, 'options.reference', version);
	const data = yield call(getReference, version);
	yield put(setReference(data));
}

/**
 *
 */
export function* watchOpen() {
	yield* takeEvery(OPEN, openWorker);
}

/**
 *
 */
export function* watchSetReference() {
	yield* takeEvery(SET_REFERENCE_VERSION, setReferenceWorker);
}
