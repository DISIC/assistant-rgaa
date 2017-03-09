import {includes, get} from 'lodash';



/**
 *
 */
export const isOpen = (state, criterionId) =>
	includes(get(state, 'criteria.opened', []), criterionId);
