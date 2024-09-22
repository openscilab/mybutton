import './index.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingCover from '@src/Components/LoadingCover';

const Share = () => {
	const location = useLocation();

	const services_url = (subject: string, link: string): { [key: string]: string } => {
		const encodedLink = encodeURIComponent(link);
		return {
			email: `mailto:?subject=${subject}&body=${encodedLink}`,
			gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${encodedLink}`,
			telegram: `https://telegram.me/share/url?url=${encodedLink}&text=${subject}`,
		};
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const service = urlParams.get('service') || '';
		const subject = urlParams.get('subject') || '';
		const link = urlParams.get('link') || '';

		const url = services_url(subject, link)[service];
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
