import moment from 'moment';
import { OBJ } from 'ahq-front-tools';
import { createReducer } from '@reduxjs/toolkit';
import { removeBrowserCache } from '../../Utils/Cache';
import { setLiveUpdateStatus, setLoadings, setLocalData } from '../actions/LocalCacheActions';
import { clearLocalStorage, clearClassData, setDisconnected } from '../actions/LocalCacheActions';

const initState: InitStateType = { loadings: { init: true }, disconnected: false };

const LocalCacheReducer = createReducer(initState, {
	//* Live update status
	[setLiveUpdateStatus.type]: (state, { payload }) => ({ ...state, liveUpdateStatus: payload }),

	//* Set server is disconnected
	[setDisconnected.type]: (state, { payload }) => ({ ...state, disconnected: payload }),

	//* Set initial and refresh cache loadings
	[setLoadings.type]: (state, { payload }) => ({
		...(state || {}),
		loadings: { ...state?.loadings, ...(payload || {}) },
	}),

	//* Clear all classes cached data
	[clearLocalStorage.type]: (state, { payload }) => {
		const { init_loading, refresh_loading } = payload;
		return {
			...initState,
			disconnected: state?.disconnected,
			liveUpdateStatus: state?.liveUpdateStatus,
			loadings: { init: init_loading, refresh: refresh_loading },
		};
	},

	//* Clear cached data for specified class
	[clearClassData.type]: (state, { payload }) => {
		removeBrowserCache();
		const new_state = OBJ.clone(state);
		delete (new_state as any)?.[payload];
		return new_state as InitStateType;
	},

	//*---------------------- Class Data reducers -------------------------

	[setLocalData.type]: (state: InitStateType, { payload }) => {
		let { class_name, data = [], deleted = [], partialUpdate, last_update } = payload;
		partialUpdate = partialUpdate || !!deleted?.length;

		const PRIMARY_KEY = `${class_name}_ID`;
		const time = last_update || moment().utc().toISOString();

		if (!partialUpdate) data = (data as any[])?.reduce((acc, i) => (acc[i?.[PRIMARY_KEY]] = i) && acc, {});
		else data = dataUpdater((state as any)?.[class_name] || {}, data, deleted || [], PRIMARY_KEY);

		const extra = { last_update: { ...(state?.last_update || {}), [class_name]: time } };

		return { ...(state || {}), [class_name]: data, ...(extra || {}) };
	},

	//*----------------------------------------------------------------------
});

const dataUpdater = (cur_data: Record<string, any>, partial_data: any[], deleted_ids: string[], pk: string) => {
	const data = OBJ.clone(cur_data);
	for (const di of deleted_ids) if (!!di) delete data?.[di];
	for (const pd of partial_data || []) if (!!pd?.[pk]) data[pd?.[pk]] = pd;
	return data;
};

type InitStateType = EXTRA & CLASS_DATA_TYPE;

type CLASS_DATA_TYPE = Partial<Record<CLASS_NAMES, Record<string, any>>>;

type EXTRA = {
	disconnected?: boolean;
	liveUpdateStatus?: boolean;
	loadings?: { init?: boolean; refresh?: boolean };
	last_update?: Partial<Record<SUG<CLASS_NAMES>, string>>;
};

export default LocalCacheReducer;
