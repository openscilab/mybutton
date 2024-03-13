import mime from 'mime';
import JSZip from 'jszip';

import { isDev } from './React';
import { promiseQueueRunner } from './Async';
import ID from './ID';

export const getMediaType = (str?: string) => {
	if (!str) return undefined;
	const mimeType = mime.getType(str);
	return mimeType?.split('/')?.[0];
};

export const dataURLtoFile = (dataUrl: any, fileName: any) => {
	var arr = dataUrl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, { type: mime });
};

export const getUrlFromFile = async (file?: File) => {
	const reader = new FileReader();
	return new Promise<string | undefined>((res, rej) => {
		reader.onloadend = (e: any) => {
			var arrayBuffer = e.target.result;
			var blob = new Blob([arrayBuffer], { type: file?.type });
			const url = URL.createObjectURL(blob);
			res(url);
		};

		reader.onerror = (e: any) => rej(e);

		reader.readAsArrayBuffer(file as any);
	});
};

export const getBlobFileFromUrl = async (url?: string) => {
	try {
		if (!url) return undefined;
		const res = await fetch(url);
		return await res.blob();
	} catch (e) {
		isDev && console.error(e);
	}
};

export const generateZipFromUrls = async (name: string, urls: string[]) => {
	const zip = new JSZip();

	const promises = urls.map(url => async () => {
		const blob = await getBlobFileFromUrl(url);
		const fileName = new ID(4).withOut('specials').generate() + '_' + /_(.*)/?.exec(url)?.[1] || '';
		if (!blob) return;
		zip.file(fileName, blob);
	});

	await promiseQueueRunner(promises, 2);

	return zip.generateAsync({ type: 'blob' });
};

export const downloadResponse = async (response: Response, fileName: string) => {
	let blob = await response.blob();
	if (blob) {
		const objUrl = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = fileName;
		link.href = objUrl;
		link.click();
	}
};

export const responseProgress = (response: Response, onProgress: (progress: number) => void) => {
	const total = +(response?.headers?.get('Content-Length') || 0);
	let loaded = 0;
	const reader = response?.body?.getReader();
	const interval = setInterval(async () => {
		const { done, value }: any = (await reader?.read()) || {};
		if (done) {
			clearInterval(interval);
			onProgress(100);
			return;
		}
		loaded += value?.length || 0;
		onProgress(Math.round((loaded / total) * 100));
	}, 50);
};
