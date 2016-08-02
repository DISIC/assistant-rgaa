import * as container from './container';



/**
 *	Exports all sagas of the application.
 */
export default function* sagas() {
	yield [
		container.watchSetPosition(),
		container.watchRequestToggle(),
		container.watchSetPopup()
	];
}
