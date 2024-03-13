import { createReducer } from '@reduxjs/toolkit';
import { setLoading, setUploadProgress } from '../actions/DashboardActions';

type InitStateType = { isLoading: boolean; uploadProgress: number };

const initState: InitStateType = { isLoading: false, uploadProgress: 0 };

const DashboardReducer = createReducer(initState, {
	//* upload progress
	[setUploadProgress.type]: (state, { payload }) => ({ ...state, uploadProgress: payload }),

	//* loading
	[setLoading.type]: (state, { payload }) => ({ ...state, isLoading: payload }),
});

export default DashboardReducer;
