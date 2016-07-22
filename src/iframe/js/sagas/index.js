import * as container from './container';
import * as messages from './messages';
import * as syncedActions from './synced-actions';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestToggle(),
		container.watchSetPopup(),
		messages.watchSend(),
		syncedActions.watchSyncedActions()
	];
}
