function validateSource(content) {
	document.querySelector('[name="fragment"]').value = content;
	document.querySelector('form').submit();
}
