const resolve = require('url').resolve;



/**
 *	Ugly thing that prepends the given URL to anchor links in
 *	a string.
 */
const linkAnchorsTo = (url) => (html) =>
	html.replace(
		/(href=")([^"]+)/i,
		(match, start, href) =>
			start + resolve(url, href)
	);



module.exports = linkAnchorsTo;
