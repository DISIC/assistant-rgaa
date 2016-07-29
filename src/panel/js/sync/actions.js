import {SET_POSITION, REQUEST_POPUP, SET_POPUP} from '../../../common/actions/container';
import {REQUEST_APPLY, REQUEST_REVERT} from '../../../common/actions/helpers';
import {OPEN} from '../../../common/actions/options';



export const receive = [
	SET_POPUP
];

export const send = [
	REQUEST_APPLY,
	REQUEST_REVERT,
	SET_POSITION,
	REQUEST_POPUP,
	OPEN
];
