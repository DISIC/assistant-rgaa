import {branch, renderNothing} from 'recompose';
import {identity} from 'lodash';



/**
 *	HoC that render its child component only if the given
 *	condition is met.
 *
 *	@param {function} condition - A function that takes the
 *		store's state and return whether the child component
 *		should render or not.
 */
export default function renderNothingUntil(condition) {
	return branch(condition, identity, renderNothing);
}
