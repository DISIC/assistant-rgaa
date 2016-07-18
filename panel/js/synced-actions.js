import {SET_POSITION, REQUEST_POPUP, SET_POPUP} from '../../common/actions/container';
import {APPLY_HELPERS, REVERT_HELPERS} from './actions/tests';

export const receive = [
	SET_POPUP
];

export const send = [
	APPLY_HELPERS,
	REVERT_HELPERS,
	SET_POSITION,
	REQUEST_POPUP
];
