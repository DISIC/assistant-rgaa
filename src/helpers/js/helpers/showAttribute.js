/**
 *
 */
export const apply = (context) =>
	toggleStylesheets(
		toArray(context.document.styleSheets),
		false
	);

/**
 *
 */
export const revert = (context) =>
	toggleStylesheets(
		toArray(context.document.styleSheets),
		true
	);
