export const DEFAULT_VERSION = '3-2016';

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

/**
 *	Flattens a hierarchical reference object into a series of
 *	objects referencing each other : "reference", "themes",
 *	"criteria", and "tests".
 */
export const flattenReference = (data) => {
	const themes = {};
	const criteria = {};
	const tests = {};

	// HORREUR SORRY BISOUS
	const reference = {
		...data,
		themes: data.themes.map((theme) => {
			themes[theme.id] = {
				...theme,
				criteria: theme.criteria.map((criterion) => {
					criteria[criterion.id] = {
						...criterion,
						themeId: theme.id,
						tests: criterion.tests.map((test) => {
							tests[test.id] = {
								...test,
								criterionId: criterion.id,
								enabled: false
							};

							return test.id;
						})
					};

					return criterion.id;
				})
			};

			return theme.id;
		})
	};

	return {
		reference,
		themes,
		criteria,
		tests
	};
};
