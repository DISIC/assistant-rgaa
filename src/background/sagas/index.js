import * as container from './container';
import * as optionsActions from './options';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchRequestPopup(),
		optionsActions.watchOpen()
	];
}
