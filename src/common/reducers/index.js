import {combineReducers} from 'redux';
import container from './container';
import helpers from './helpers';
import reference from './reference';
import themes from './themes';
import criteria from './criteria';
import tests from './tests';
import instructions from './instructions';
import checklist from './checklist';
import tabs from './tabs';
import imports from './imports';



export const reducers = {
	container,
	helpers,
	reference,
	themes,
	criteria,
	tests,
	instructions,
	checklist,
	tabs,
	imports
};

export default combineReducers(reducers);
