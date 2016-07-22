import {SET_POSITION, REQUEST_POPUP, SET_POPUP} from '../../common/actions/container';
import {REQUEST_APPLY_HELPERS, REQUEST_REVERT_HELPERS} from '../../common/actions/helpers';

export const receive = [
	SET_POPUP
];

export const send = [
	REQUEST_APPLY_HELPERS,
	REQUEST_REVERT_HELPERS,
	SET_POSITION,
	REQUEST_POPUP
];
