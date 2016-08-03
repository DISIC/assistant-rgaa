import $ from 'jquery';



/**
 *
 */
export const getModule = (name) =>
	require(`../helpers/${name}`);
