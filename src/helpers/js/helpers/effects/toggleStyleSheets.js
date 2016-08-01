/**
 *
 */
export default function toggleStyleSheets(styleSheets, toggled) {
	styleSheets.forEach((stylesheet) =>
		stylesheet.disabled = !toggled
	);
}
