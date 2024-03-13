import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const usePersistedState = <T extends any>(keyName: string, initState: T) => {
	const key = `PERSIST_STATE_${keyName}`;
	const [state, setState] = useState<T>(initState);
	const [isInitLoaded, setIsInitLoaded] = useState(false);

	useEffect(() => {
		const initData = getItem<T>(key);
		if (!!initData) setState(initData);
		setIsInitLoaded(true);
	}, []);

	useEffect(() => {
		if (isInitLoaded) setItem(key, state);
	}, [keyName, state, initState]);

	return [state, setState] as [T, Dispatch<SetStateAction<T>>];
};

export const getItem = <T>(key: string): T | undefined => {
	if (!localStorage) return undefined;
	const value = localStorage.getItem(key);
	if (value) return JSON.parse(value) as T;
	return undefined;
};

export const setItem = (key: string, value: any) =>
	localStorage.setItem(key, JSON.stringify(value));

export const clearItem = (key: string, value: any) => localStorage.removeItem(key);

export default usePersistedState;
