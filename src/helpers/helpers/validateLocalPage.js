import {noop} from 'lodash';
import LocalPageValidatorContainer from '../components/LocalPageValidatorContainer';



/**
 *	Describes the helper.
 */
export const describe = () => (
	'Ouvre l\'outil externe "Validateur W3C pour HTML local".'
);

/**
 *
 */
export const component = () =>
	LocalPageValidatorContainer;

/**
 *
 */
export const apply = noop;

/**
 *
 */
export const revert = noop;
