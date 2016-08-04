/*
 * retrieve the helpers mapping full json object from a given reference version
 */
export const getHelpers = (version) => {
	try {
		return require(`../../../data/helpers/${version}`);
	} catch (e) {
		return {};
	}
};
