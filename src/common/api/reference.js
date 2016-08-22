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

/*
 * get an array of {name, filename, version}
 */
export const getReferencesList = () => ([
	{name: 'RGAA 3', version: '3'},
	{name: 'RGAA 3-2016', version: '3-2016'},
	{name: 'RGAA 4.2', version: '4.2'}
]);

/*
 * retrieve the reference full json object from a given reference version property
 */
export const getReference = (version) =>
	fetch(chrome.extension.getURL(`data/references/${version}.json`))
		.then((response) => response.json());
