import { createReducer } from '@reduxjs/toolkit';
import { setOpenShareModal } from '../actions/LocalCacheActions';

const initState: InitStateType = { openShareModal: false };

const LocalCacheReducer = createReducer(initState, {
	//* Set open/close share modal
	[setOpenShareModal.type]: (state, { payload }) => ({ ...state, openShareModal: payload }),
});

type InitStateType = { openShareModal: boolean };

export default LocalCacheReducer;
