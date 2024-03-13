import { dataURLtoFile } from './File';
export const getCroppedImg = (image: any, crop: any, fileName: any) => {
	const canvas = document.createElement('canvas');
	const ctx: any = canvas.getContext('2d');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = 210;
	canvas.height = 210;
	ctx.imageSmoothingQuality = 'low';
	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		canvas.width,
		canvas.height
	);
	return new Promise((resolve, _) => {
		canvas.toBlob(
			(blob: any) => {
				if (!blob) return console.error('Canvas is empty');
				blob.name = fileName;
				blob.crossOrigin = 'Anonymous';
				const fileUrl = window.URL.createObjectURL(blob);
				resolve({ fileUrl, blob });
			},
			'image/jpeg',
			1
		);
	});
};

export const getVideoThumbnail = (video: HTMLVideoElement) => {
	try {
		const size = 400;
		const canvas = document.createElement('canvas');
		const width = video.videoWidth;
		const height = video.videoHeight;

		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext('2d');
		ctx?.drawImage(video, (width - height) / 2, 0, height, height, 0, 0, canvas.width, canvas.height);
		const dataURI = canvas.toDataURL('image/jpeg');
		return {
			canvas: canvas,
			base64: dataURI,
			file: dataURLtoFile(dataURI, `${+new Date()}.jpg`),
		};
	} catch (e) {
		console.error(e);
	}
};

export const getFileName = (file: any): string => {
	let parts = file?.name?.split('.') || [];
	parts.pop();
	return parts.join('');
};

export default getCroppedImg;
