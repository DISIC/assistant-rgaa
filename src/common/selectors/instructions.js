import {get} from 'lodash';



/**
 *
 */
const RGAA = 'rgaa';

/**
 *
 */
export const getInstructionsByTest = (state, id) =>
	get(state, ['instructions', id, RGAA]);
