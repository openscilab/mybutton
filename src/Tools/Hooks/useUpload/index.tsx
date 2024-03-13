import { useRef, useState, useEffect } from 'react';
import { USE_UPLOAD_OPTIONS } from './Types';

const useFileSelector = (options?: USE_UPLOAD_OPTIONS) => {
	const [files, setFiles] = useState<FileList | null>();
	const elementRef = useRef<HTMLInputElement>(createFileElement());

	//?------------------ useEffect -----------------------------------

	useEffect(() => {
		elementRef.current.onchange = e => onChangeHandler(e as any);
	}, []);

	useEffect(() => {
		const { accept } = options || {};
		if (accept) elementRef.current.setAttribute('accept', accept);
		//
	}, [options]);

	//?------------------ Utilities -----------------------------------

	const setMultiple = (is: boolean) => {
		if (is) elementRef.current.setAttribute('multiple', 'multiple');
		else elementRef.current.removeAttribute('multiple');
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = e.target.files;
		setFiles(files);
	};

	//?----------------------------------------------------------------

	const selectFiles = () => {
		setMultiple(true);
		elementRef.current?.click();
	};

	const selectFile = () => {
		setMultiple(false);
		elementRef.current?.click();
	};

	const clearFile = () => {
		setFiles(null);
		elementRef.current.value = '';
	};

	return {
		files,
		clearFile,
		selectFile,
		selectFiles,
		setFiles,
		element: elementRef.current,
		file: (files?.length === 1 && files?.[0]) || undefined,
	};
};

const createFileElement = () => {
	const element = document.createElement('input');
	element.setAttribute('type', 'file');
	return element;
};

export default useFileSelector;
