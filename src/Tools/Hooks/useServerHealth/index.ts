import { useRef, useEffect } from 'react';
import { CONFIG } from '@config/constants';
import useStore from '@tools/Store/useStore';
import useLocalCache from '../useLocalCache';
import { TabChannel } from '../../Utils/Tab';
import { setDisconnected } from '../../Store/actions/LocalCacheActions';

const tab = TabChannel('DMP-SERVER-HEALTH-CHECKER');

const useServerHealth = () => {
	const { dispatch } = useStore();
	const { disconnected } = useLocalCache();
	const intervalRef = useRef<NodeJS.Timeout>();
	const failIntervalRef = useRef<NodeJS.Timeout>();

	// ?------------------Utils------------------------

	const setConnected = (connected?: boolean) => {
		dispatch(setDisconnected(!connected));
	};

	const check = async () => {
		const isOK = await checkServerHealth();
		if (!disconnected !== isOK) setConnected(isOK);
		return isOK;
	};

	const runHealthChecker = () =>
		tab?.on?.singleRun(() => {
			check();
			intervalRef.current = setInterval(check, 30000);
		});

	// ?---------------useEffects----------------------

	useEffect(() => {
		if (disconnected) failIntervalRef.current = setInterval(check, 5000);
		else failIntervalRef?.current && clearInterval(failIntervalRef?.current);
	}, [disconnected]);

	useEffect(() => {
		return () => {
			intervalRef.current && clearInterval(intervalRef.current);
			failIntervalRef.current && clearInterval(failIntervalRef.current);
		};
	}, []);

	// ------------------------------------------------

	return {
		check,
		setConnected,
		runHealthChecker,
		isOK: !disconnected,
	};
};

export const checkServerHealth = async () => {
	try {
		const res = await fetch(`${CONFIG.SERVER}/parse/health`);
		window.server_health = res?.status === 200;
	} catch (error: any) {
		console.error('🔴Server health check failed');
		window.server_health = false;
	} finally {
		return window.server_health;
	}
};

export default useServerHealth;
