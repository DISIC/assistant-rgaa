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
export const describe = () =>
	'Affiche la hiérarchie de titres de la page.';

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
