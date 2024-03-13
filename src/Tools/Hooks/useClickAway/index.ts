import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;
const useClickAway = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: AnyEvent) => void
) => {
	useEffect(() => {
		const listener = (event: AnyEvent) => {
			const el = ref?.current;
			if (!el || el.contains(event.target as Node)) return;
			handler(event);
		};
		document.addEventListener(`mousedown`, listener);
		document.addEventListener(`touchstart`, listener);
		return () => {
			document.removeEventListener(`mousedown`, listener);
			document.removeEventListener(`touchstart`, listener);
		};
	}, [ref, handler]);
};

//? how to use :
//https://usehooks-typescript.com/react-hook/use-on-click-outside

export default useClickAway;
