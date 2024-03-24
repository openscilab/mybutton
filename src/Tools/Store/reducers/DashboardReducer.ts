import { createReducer } from '@reduxjs/toolkit';
import { setLoading, setOpenShareModal, setUploadProgress } from '../actions/DashboardActions';

type InitStateType = { isLoading: boolean; uploadProgress: number; openShareModal: boolean };

const initState: InitStateType = { isLoading: false, uploadProgress: 0, openShareModal: false };

const DashboardReducer = createReducer(initState, {
	//* upload progress
	[setUploadProgress.type]: (state, { payload }) => ({ ...state, uploadProgress: payload }),

	//* loading
	[setLoading.type]: (state, { payload }) => ({ ...state, isLoading: payload }),

	//* Set open/close share modal
	[setOpenShareModal.type]: (state, { payload }) => ({ ...state, openShareModal: payload }),
});

export default DashboardReducer;
