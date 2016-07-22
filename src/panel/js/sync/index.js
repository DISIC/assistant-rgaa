import store from '../store';
import {dispatchOnMessage} from '../../../common/sync/listeners';
import {receive} from './actions';



/**
 * "receive" part of the synchronization between
 * 	background and content scripts.
 *
 * 	the "send" part is made through the sagas:
 * 	see sagas/messages and sagas/synced-actions
 */
export const handleBackgroundMessages = dispatchOnMessage(store, receive);
