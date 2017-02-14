import colorString from 'color-string';



/**
 *
 */
export const getPixelAt = (image, x, y) =>
	new Promise((resolve) => {
		const resolveWithPixel = () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;

			const context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);

			const pixel = context.getImageData(x, y, 1, 1);
			const hex = colorString.to.hex(pixel.data);

			resolve(hex);
		};

		if (image.naturalWidth) {
			resolve(resolveWithPixel());
		} else {
			image.onload = resolveWithPixel;
		}
	});
