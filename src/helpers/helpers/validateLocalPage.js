import {noop} from 'lodash';
import LocalPageValidatorContainer from '../components/LocalPageValidatorContainer';



/**
 *	Describes the helper.
 */
export const describe = (intl) =>
	intl.formatHTMLMessage({
		id: 'Helper.validateLocalPage'
	});

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
