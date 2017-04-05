import {noop} from 'lodash';
import ExternalToolContainer from '../components/ExternalToolContainer';



/**
 *	@param {string} name - Tool name.
 *	@param {string} url - Tool URL.
 */
export const defaults = {
	name: '',
	url: ''
};

/**
 *	Describes the helper.
 *
 *	@param {object} intl - Intl API.
 */
export const describe = (intl, {name} = defaults) =>
	intl.formatHTMLMessage({
		id: 'Helper.externalTool'
	}, {
		name,
		hasname: !!name
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
