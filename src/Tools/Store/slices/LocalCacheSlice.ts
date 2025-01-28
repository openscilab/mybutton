import { createSlice } from '@reduxjs/toolkit';
import useStore from '../useStore';

type InitStateType = { shareModal: { open: boolean; url?: string; subject?: string }; activePage: string };

const initialState: InitStateType = { shareModal: { open: false }, activePage: 'home' };

const localCacheSlice = createSlice({
	name: 'localCache',
	initialState,
	reducers: {
		setShareModal(state, { payload }) {
			state.shareModal = payload;
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

export const { setShareModal, setActivePage } = localCacheSlice.actions;

export default localCacheSlice;
