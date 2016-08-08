import {combineReducers} from 'redux';
import container from './container';
import helpers from './helpers';
import reference from './reference';
import instructions from './instructions';
import tabs from './tabs';



export const reducers = {
	container,
	helpers,
	reference,
	instructions,
	tabs
};

export default combineReducers(reducers);
