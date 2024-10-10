import './index.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingCover from '@src/Components/LoadingCover';
import { services_url } from '@src/Data/services.data';

const Share = () => {
	const location = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const service = urlParams.get('service') || '';
		const subject = urlParams.get('subject') || '';
		const link = urlParams.get('link') || '';

		const url = services_url(encodeURIComponent(link), subject)[service];
		setTimeout(() => {
			window.open(url, '_self');
		}, 100);
	}, [location.search]);

	return (
		<div className='share-layout'>
			<LoadingCover />
		</div>
	);
};

export default Share;
