import {sendMessage} from '../../common/api/runtime';
import getHeadingsHierarchy from '../api/getHeadingsHierarchy';
import {GET} from '../actions/headingsHierarchy';
import HeadingsHierarchyContainer from '../components/HeadingsHierarchyContainer';



/**
 *
 */
export const component = () =>
	HeadingsHierarchyContainer;

/**
 *	Describes the helper.
 */
export const describe = (intl) =>
	intl.formatHTMLMessage({
		id: 'Helper.headingsHierarchy'
	});

/**
 *
 */
export const apply = () => {
	sendMessage({
		type: GET,
		payload: getHeadingsHierarchy()
	});
};

/**
 *
 */
export const revert = () => {};
