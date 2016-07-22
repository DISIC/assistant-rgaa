import {flatMap, values} from 'lodash';



/**
 *	Loads all sagas from the 'sagas' folder and merges them
 *	into a single generator function.
 */
const req = require.context('./sagas', true, /\.js$/);
const generators = flatMap(req.keys(), (key) =>
	values(req(key))
);



export default function* sagas() {
	yield generators.map((saga) => saga());
}
