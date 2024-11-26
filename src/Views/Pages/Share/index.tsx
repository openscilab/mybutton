import './index.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingCover from '@src/Components/LoadingCover';
import { services_url } from '@src/Data/services.data';
import { decode } from '@src/Tools/Utils/URLEncoding';

const Share = () => {
	const location = useLocation();

	useEffect(() => {
		let urlParams = new URLSearchParams(location.search);
		const encoded_param = urlParams.get('encoded') || '';
		if (encoded_param) {
			urlParams = new URLSearchParams(decode(encoded_param));
		}
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
