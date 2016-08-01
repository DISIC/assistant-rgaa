/**
 *
 */
export default function toggleClassName(elements, className, toggled) {
	elements.forEach((element) =>
		element.classList.toggle(className, toggled)
	);
}
