import {combineReducers} from 'redux';
import panel from './panel';
import helpers from './helpers';
import reference from './reference';
import themes from './themes';
import criteria from './criteria';
import tests from './tests';
import instructions from './instructions';
import checklist from './checklist';
import imports from './imports';



/**
 *	Reducers shared by each instance in the background.
 */
export const sharedReducers = {
	reference,
	themes,
	criteria,
	tests
};

/**
 *	Reducers that are instance-specific in the background.
 */
export const appReducers = {
	panel,
	helpers,
	instructions,
	checklist,
	imports
};

export const reducers = {
	...sharedReducers,
	...appReducers
};

export default combineReducers(reducers);
