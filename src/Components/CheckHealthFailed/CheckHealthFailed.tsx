import { Loader } from 'rsuite';
import './CheckHealthFailed.scss';
import { useEffect } from 'react';
import FaIcon from '@components/FaIcon';
import useServerHealth from '@tools/Hooks/useServerHealth';

const CheckHealthFailed = () => {
	const { isOK, runHealthChecker } = useServerHealth();

	useEffect(runHealthChecker, []);

	if (isOK) return null;

	return (
		<div className='check-health-failed-layout'>
			<Loader speed='slow' />
			<div className='center-box'>
				<FaIcon fa='t-cloud-exclamation' />
				<div className='title'>Connection failed</div>
				<div className='description'>Trying to reconnect ...</div>
			</div>
		</div>
	);
};

export default CheckHealthFailed;
