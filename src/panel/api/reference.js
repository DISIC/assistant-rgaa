import {find, get, flatten, map} from 'lodash';



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
