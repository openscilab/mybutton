import { createAction } from '@reduxjs/toolkit';

export type LocalActionEntryType = {
	data: any;
	class_name: string;
	deleted?: string[];
	last_update?: string;
	partialUpdate: boolean;
};

export const clearClassData = createAction<string>('clearClassData');

export const setDisconnected = createAction<boolean>('setDisconnected');

export const setLocalData = createAction<LocalActionEntryType>('setLocalData');

export const setLiveUpdateStatus = createAction<boolean>('setLiveUpdateStatus');

export const setLoadings = createAction<{ init?: boolean; refresh?: boolean }>('setLoadings');

export const clearLocalStorage = createAction<{ init_loading?: boolean; refresh_loading?: boolean }>('clearLocalStorage');
