import { useEffect } from 'react';
import { useData } from '../useData/index';
import { useLocation } from 'react-router-dom';

const useCurPageTitle = (title: string | undefined) => {
	const location = useLocation();
	const { data } = useData({ title: document?.title, path: location?.pathname }, [title]);

	useEffect(() => {
		if (!title) return;
		document.title = title;
	}, [title]);

	useEffect(() => {
		if (location.pathname === data?.path) return;
		document.title = data?.title;
	}, [title, location.pathname]);
};

export default useCurPageTitle;
