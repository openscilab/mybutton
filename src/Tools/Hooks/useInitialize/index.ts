import { useEffect } from 'react';
import { removeFaIconCache } from '@tools/Utils/Cache';
import useCacheUpdateListener from './useCacheUpdateListener';

const useInitialize = () => {
	useCacheUpdateListener();

	//? -------- useEffect --------------
	useEffect(() => {
		//? Remove FaIcon Cache
		removeFaIconCache();
		//? the it will re-cache it again
	}, []);
};

export default useInitialize;
