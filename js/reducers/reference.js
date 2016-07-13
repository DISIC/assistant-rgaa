/**
 *
 */
const initialState = {
	version: '3',
	themes: [
		{
			id: '1',
			title: '1. Images',
			criteria: [
				{
					id: '1.1',
					title: 'Critère 1.1 [A] Chaque image a-t-elle une alternative textuelle ?',
					tests: [
						{
							id: '1.1.1',
							title: 'Test 1.1.1 : Chaque image (balise img) a-t-elle un attribut alt ?',
							helpers: [
								'disableAllStyles'
							]
						}
					]
				}
			]
		}
	]
};

/**
 *
 */
export function reference(state = initialState, {type, payload}) {
	switch (type) {
		default:
			return state;
	}
}
