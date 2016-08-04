import {find, get, flatten, map, sortBy} from 'lodash';
import path from 'path';



/*
 *
 */
export const getTheme = (themeId, reference) =>
	find(reference.themes, {id: themeId});

/**
 *
 */
export const getAllCriteria = (reference) =>
	flatten(map(reference.themes, 'criteria'));

/*
 *
 */
export const getCriterion = (criterionId, reference) =>
	find(getAllCriteria(reference), {id: criterionId});

/*
 *
 */
export const getFirstTheme = (reference) =>
	get(reference, 'themes[0]', null);

/*
 *
 */
export const getFirstCriterion = (theme) => {
	if (!theme) {
		return null;
	}
	return get(theme, 'criteria[0]', null);
};

/*
 * get an array of {name, filename, version}
 */
export const getReferencesList = () => {
	const req = require.context('../../../data/references', true, /\.json$/);
	const references = req.keys().map(key => {
		const {name} = req(key);
		const version = path.basename(key, '.json');
		return {
			version,
			name
		};
	});
	return sortBy(references, 'name');
};

/*
 * retrieve the reference full json object from a given reference version property
 */
export const getReference = (version) => {
	try {
		return require(`../../../data/references/${version}`);
	} catch (e) {
		return null;
	}
};
