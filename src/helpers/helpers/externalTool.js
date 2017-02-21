import {noop} from 'lodash';
import ExternalToolContainer from '../components/ExternalToolContainer';



/**
 *	Describes the helper.
 *
 *	@param {string} name - Tool name.
 */
export const describe = (name) => (
	name
		? `Ouvre l'outil externe "${name}".`
		: 'Ouvre un outil externe.'
);

/**
 *
 */
export const component = () =>
	ExternalToolContainer;

/**
 *
 */
export const apply = noop;

/**
 *
 */
export const revert = noop;
