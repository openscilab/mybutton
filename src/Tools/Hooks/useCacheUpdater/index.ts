import useClass from '../useClass';
import useFetch from '../useFetch';
import { useStore } from 'react-redux';
import useAccount from '../useAccount';
import useRole from '../useRole/useRole';
import { useEffect, useRef } from 'react';
import { isAfter } from '@tools/Utils/Date';
import { Notify } from '@tools/Utils/React';
import useLocalCache from '../useLocalCache';
import { promiseQueueRunner } from '@tools/Utils/Async';
import useLoading from '@tools/Hooks/useLoading/useLoading';
import { logout } from '@tools/Store/actions/AccountActions';
import { clearLocalStorage } from '../../Store/actions/LocalCacheActions';
import { setLoadings, clearClassData, setLocalData } from '@tools/Store/actions/LocalCacheActions';

const useCacheUpdater = () => {
	const { Get } = useFetch();
	const { role } = useRole();
	const loading = useLoading();
	const { user } = useAccount();
	const { dispatch } = useStore();
	const { Class: LIVE_CLASS } = useClass('LIVE_CLASS');
	const { last_update, liveUpdateStatus } = useLocalCache();

	//?--------------------- Vars -------------------------------------------------//

	const lastUpdateRef = useRef(last_update);

	//?------------------- useEffects ---------------------------------------------//

	useEffect(() => {
		lastUpdateRef.current = last_update;
	}, [last_update]);

	//?------------------- Utils --------------------------------------------------//

	//? Check for update
	const check = async (className?: string, last_update?: string, cache_date?: string) => {
		loading.on('check');
		try {
			if (className) {
				//* single update
				const local_last_update = lastUpdateRef?.current?.[className];
				if (!local_last_update || !cache_date) return update(className);
				const is_cache_update = isAfter(cache_date, local_last_update);
				await update(className, last_update, is_cache_update);
			} else {
				//* multi update
				const { items = [] } = (await LIVE_CLASS.getItems()) || {};
				const entries = Object.entries((items as any) || {});
				const promises = entries?.map((entry: any) => async () => {
					const [class_name, { last_update, last_refresh_cache }] = entry;
					const local_last_update = lastUpdateRef?.current?.[class_name];
					if (!local_last_update) return await update(class_name);
					const is_local_update = isAfter(last_update, local_last_update);
					const is_cache_update = isAfter(last_refresh_cache, local_last_update);
					const is_update_needed = is_cache_update || is_local_update;
					if (is_update_needed) await update(class_name, last_update, is_cache_update);
				});
				await promiseQueueRunner(promises, 10);
				loading.off('check');
				dispatch(setLoadings({ init: false, refresh: false }));
			}
		} catch (error) {
			console.error(error);
		}
	};

	//? Check only if the live update status is off
	const checkIfLiveOff = async (className?: CLASS_NAMES) => {
		if (liveUpdateStatus) return;
		await check(className);
	};

	//? Update handler
	const update = async (class_name: string, last_update?: string, is_refresh_cache?: boolean) => {
		if (!class_name) return;
		const url = `/classes/${class_name}`;
		const query = is_refresh_cache ? {} : { params: { last_update: lastUpdateRef?.current?.[class_name] } };
		try {
			const { items: data = [], deleted = [] } = (await Get({ url, ...query })) || {};
			window.logs &&
				console.log(`%c${class_name}`, 'color:#1ED65E;font-weight:bold', {
					...(!!data?.length ? { items: data } : {}),
					...(!!deleted?.length ? { deleted } : {}),
				});
			isUserRoleChanged(class_name, data);
			if (is_refresh_cache) dispatch(clearClassData(class_name));
			dispatch(setLocalData({ class_name, data, deleted, partialUpdate: !is_refresh_cache, last_update }));
		} catch (error) {
			console.error(`Problem in fetching ${class_name}`, error);
		}
	};

	//? Clear and refresh the whole cache
	const refresh = async () => {
		loading.on('refresh');
		dispatch(clearLocalStorage({ refresh_loading: true, init_loading: false }));
		const { items = [] } = (await LIVE_CLASS.getItems()) || {};
		const entries = Object.entries((items as any) || {});
		const promises = entries?.map((entry: any) => async () => await update(entry?.[0], undefined, true));
		await promiseQueueRunner(promises, 10);
		dispatch(setLoadings({ refresh: false }));
		loading.off('refresh');
	};

	//? If the role changed, logout the user
	const isUserRoleChanged = (CLASS_NAME: string, items: any[]) => {
		if (CLASS_NAME !== 'SYSTEM_USER') return;
		const item = items?.find(i => i?.[`${CLASS_NAME}_ID`] === user?.ID);
		if (!item) return;
		const new_role = item?.SYSTEM_USER_ROLE?.item?.role_name;
		if (new_role === role) return;
		dispatch(logout());
		Notify.info('You have been logged out due to role change.');
		Notify.info('Please login again.');
	};

	//----------------------------------------------------------------------------//

	return { check, update, refresh, loading, checkWithoutLiveUpdateStatus: checkIfLiveOff, liveUpdateStatus };
};

export default useCacheUpdater;
