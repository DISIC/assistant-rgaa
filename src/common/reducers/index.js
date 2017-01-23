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



export const reducers = {
	panel,
	helpers,
	reference,
	themes,
	criteria,
	tests,
	instructions,
	checklist,
	imports
};

export default combineReducers(reducers);
