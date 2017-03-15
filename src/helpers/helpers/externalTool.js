import {noop} from 'lodash';
import ExternalToolContainer from '../components/ExternalToolContainer';



/**
 *	Describes the helper.
 *
 *	@param {string} name - Tool name.
 */
export const describe = (intl, name) =>
	intl.formatHTMLMessage({
		id: 'Helper.externalTool'
	}, {
		name,
		hasName: !!name
	});

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
