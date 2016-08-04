import {find, get, flatten, map, sortBy} from 'lodash';



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
 *
 */
export const getAllReferences = () =>
	// lis le contenu de data/references et retourne un tableau
	// [{ file: ..., name: ... }, {file,name}]
	sortBy([
		{file: 'rgaa-3-2016.json', name: 'version 3-2016', version: '3-2016'},
		{file: 'rgaa-3.json', name: 'version 3', version: '3'}
	], 'name');
