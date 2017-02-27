/**
 * get source code of given page
 */
export const getSource = (url) =>
	fetch(url).then(content => content.text());
