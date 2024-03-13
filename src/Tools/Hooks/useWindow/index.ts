import { useEffect, useState, useRef } from 'react';

type WindowSize = { width: number; height: number };

const useWindow = () => {
	const [focused, setFocused] = useState(hasFocus);
	const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
	const winRef = useRef({ focused, windowSize });

	//? --------------------- Utils ---------------------------------

	const setWindowSizeOnResize = () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	};

	//? --------------------- useEffects ----------------------------

	useEffect(() => {
		setFocused(hasFocus());
		const onFocus = () => setFocused(true);
		const onBlur = () => setFocused(false);
		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);
		return () => {
			window.removeEventListener('focus', onFocus);
			window.removeEventListener('blur', onBlur);
		};
	}, []);

	useEffect(() => {
		setWindowSizeOnResize();
		window.addEventListener('resize', setWindowSizeOnResize);
		return () => window.removeEventListener('resize', setWindowSizeOnResize);
	}, []);

	useEffect(() => {
		winRef.current = { focused, windowSize };
	}, [focused, windowSize]);

	// ---------------------------------------------------------------

	return {
		winRef,
		size: windowSize,
		hasFocus: focused,
		isMobile: windowSize?.width < 481,
		isDesktop: windowSize?.width > 992,
	};
};

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

export default useWindow;
