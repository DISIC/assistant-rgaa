import {get} from 'lodash';



/**
 *
 */
const ALL = 'all';
const RGAA = 'rgaa';

/**
 *
 */
export const getInstructionsByTest = (state, id) =>
	get(state, ['instructions', id, RGAA])
	|| get(state, ['instructions', id, ALL]);
