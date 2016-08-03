/**
 *
 */
export const getModule = (name) =>
	// eslint-disable-next-line global-require
	require(`../helpers/${name}`);
