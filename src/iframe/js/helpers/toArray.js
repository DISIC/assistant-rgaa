import toArray from './toArray';



/**
 *	Converts array-like objects (like NodeList) to regular arrays.
 */
export default const toArray = (arrayLike) =>
	Array.slice.call(arrayLike);
