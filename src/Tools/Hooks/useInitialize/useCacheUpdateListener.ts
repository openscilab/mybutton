import { PROMISE } from 'ahq-front-tools';
import { CONFIG } from '@config/constants';
import { TabChannel } from '../../Utils/Tab';
import { isTokenValid } from '../useAccount';
import useStore from '@tools/Store/useStore';
import useLocalCache from '../useLocalCache';
import { subscribe } from '../../Utils/Parse';
import useAccount from '@tools/Hooks/useAccount';
import useCacheUpdater from '../useCacheUpdater';
import { useRef, useEffect, useCallback } from 'react';
import useServerHealth from '../useServerHealth/index';
import { setLiveUpdateStatus } from '@tools/Store/actions/LocalCacheActions';

const tab = TabChannel(`${CONFIG.APP_SHORT_NAME}-TAB-CHANNEL`);

const useCacheUpdateListener = () => {
	const { dispatch } = useStore();
	const health = useServerHealth();
	const timeOutRef = useRef<any>();
	const { check } = useCacheUpdater();
	const { user, loggedIn } = useAccount();
	const { last_update } = useLocalCache();
	const lastUpdateRef = useRef(last_update);
	const classesRef = useRef<Set<string>>(new Set());

	//* --------------------- Live Client -----------------------------------------

	const clientRef = useRef<Parse.LiveQuerySubscription>();

	const unsubscribe = () => {
		clientRef.current?.unsubscribe();
		clearTimeout(timeOutRef.current);
	};

	//?------------------- useEffects ---------------------------------------------//

	useEffect(() => {
		initLoad();
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (loggedIn && isTokenValid(user?.token)) return;
		unsubscribe();
	}, [user, loggedIn]);

	useEffect(() => {
		lastUpdateRef.current = last_update;
	}, [last_update]);

	const initLoad = async () => {
		connectClient();
		await check();
		window.addEventListener('beforeunload', unsubscribe);
	};

	//?------------------- Utils --------------------------------------------------//

	//? Connect websocket client
	const connectClient = useCallback(() => {
		if (!!clientRef.current) return;
		const job = async () => {
			try {
				//? Set initial live update status to false
				dispatch(setLiveUpdateStatus(false));

				//? ---------------- Subscribing the socket client -------------------

				const client = await subscribe('LIVE_CLASS');

				client?.on('update', PO => {
					if (!loggedIn) return;
					clientRef.current = client;
					clearTimeout(timeOutRef.current);
					const item = PO?.toJSON() || {};
					classesRef.current.add(item?.class_name);
					timeOutRef.current = setTimeout(() => {
						const { last_refresh_cache: cache_date, last_update } = item;
						classesRef.current?.forEach(cn => check(cn, last_update, cache_date));
						classesRef.current.clear();
					}, 0);
				});

				client?.on('open', () => {
					check();
					dispatch(setLiveUpdateStatus(true));
					console.log('🟢 Live update activated');
					health.check();
				});

				client?.on('close', () => {
					dispatch(setLiveUpdateStatus(false));
					console.log('🔴 Live update de-activated');
					health.check();
				});

				// ------------------------------------------------------------------
			} catch (error: any) {
				console.error('🔴useCacheUpdateListener > job', `\n\t${error}`);
				await PROMISE.wait(1000);
				job();
			}
		};
		//? Only run one instance in multiple tabs
		tab?.on?.singleRun(job);
	}, []);
	//----------------------------------------------------------------------------//
};

export default useCacheUpdateListener;
