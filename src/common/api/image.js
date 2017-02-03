import colorString from 'color-string';



/**
 *
 */
export const getPixelAt = (image, x, y) => {
	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.src = image;

	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);

	const pixel = context.getImageData(x, y, 1, 1);

	return colorString.to.hex(pixel.data);
};
