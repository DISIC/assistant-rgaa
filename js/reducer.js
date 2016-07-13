import {combineReducers} from 'redux';
import {assign} from 'lodash';



/**
 *	Loads all reducers from the 'reducers' folder, and merges
 *	them into a single object.
 */
const req = require.context('./reducers', true, /\.js$/);
const modules = req.keys().map(req);
const reducers = assign.apply(null, modules);



export default combineReducers(reducers);
