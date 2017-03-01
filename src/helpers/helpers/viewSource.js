import {noop} from 'lodash';
import ViewSourceContainer from '../components/ViewSourceContainer';



/**
 *	Describes the helper.
 */
export const describe = () => (
	'Ouvre l\'outil externe "Voir les sources".'
);

/**
 *
 */
export const component = () =>
	ViewSourceContainer;

/**
 *
 */
export const apply = noop;

/**
 *
 */
export const revert = noop;
