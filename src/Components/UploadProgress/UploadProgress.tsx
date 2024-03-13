import './UploadProgress.scss';
import FaIcon from '@components/FaIcon';
import { useEffect, useState, useRef } from 'react';
import useDashboard from '../../Tools/Hooks/useDashboard';

const UploadProgress = () => {
	const intervalRef = useRef<any>();
	const { uploadProgress } = useDashboard();
	const [dots, setDots] = useState<number>(1);

	const isEnded = !uploadProgress || uploadProgress === 100;

	useEffect(() => {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setDots(d => (d >= 4 ? 0 : d + 1));
		}, 500);
	}, [uploadProgress]);

	if (isEnded) {
		clearInterval(intervalRef.current);
		return null;
	}

	return (
		<div className='upload-progress-layout'>
			<div style={{ width: uploadProgress + '%' }} className='progress' />
			<div className='label'>
				<FaIcon fa='s-cloud-arrow-up' />
				{uploadProgress}
				<small>%</small>
				<span className='message'>Uploading file {[...Array(dots)].map(_ => '.')}</span>
			</div>
		</div>
	);
};

export default UploadProgress;
