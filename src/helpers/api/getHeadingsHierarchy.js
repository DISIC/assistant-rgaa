


/**
 *
 */
const getHeadingLevel = (element) =>
	element.getAttribute('role') === 'heading' && element.hasAttribute('aria-level')
		? element.getAttribute('aria-level') * 1
		: element.tagName.toLowerCase().substring(1) * 1;

/**
 *
 */
const getHeadingText = (element) => {
	if (element.innerText) {
		return element.innerText;
	}
	// try to get text from potential img alts
	const images = [].slice.call(element.querySelectorAll('img[alt]'));
	const imagesText = images.map((image) => (
		image.getAttribute('alt')
	)).join(' - ');
	if (imagesText.length) {
		return imagesText;
	}

	return 'Erreur lors de la récupération du texte';
};

/**
 *
 */
export default function getHeadingsHierarchy() {
	const headings = [].slice.call(document.querySelectorAll(
		'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]'
	));

	if (!headings.length) {
		return [];
	}

	const hierarchy = headings.map((element) => ({
		level: getHeadingLevel(element),
		text: getHeadingText(element)
	}));

	console.log(hierarchy);
	return hierarchy;
}
