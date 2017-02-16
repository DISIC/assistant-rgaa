/**
 *
 */
export default function waitForEvent(event) {
	return new Promise((resolve) => {
		const handler = (...args) => {
			document.removeEventListener(event, handler);
			resolve(...args);
		};

		document.addEventListener(event, handler);
	});
}
