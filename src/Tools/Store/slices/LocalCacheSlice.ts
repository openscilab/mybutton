import { createSlice } from '@reduxjs/toolkit';
import useStore from '../useStore';

type InitStateType = { openShareModal: boolean; activePage: string };

const initialState: InitStateType = { openShareModal: false, activePage: 'home' };

const localCacheSlice = createSlice({
	name: 'localCache',
	initialState,
	reducers: {
		setOpenShareModal(state, { payload }) {
			state.openShareModal = payload;
		},
		setActivePage(state, { payload }) {
			state.activePage = payload;
		},
	},
});

export const useLocalCache = () => {
	const { selector } = useStore();
	return selector(s => s?.localStorage);
};

export const { setOpenShareModal, setActivePage } = localCacheSlice.actions;

export default localCacheSlice;
