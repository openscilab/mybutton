import { createAction } from '@reduxjs/toolkit';

export const setLoading = createAction<boolean>('setLoading');

export const setUploadProgress = createAction<number>('setUploadProgress');
