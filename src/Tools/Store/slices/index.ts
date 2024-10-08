import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LocalCacheReducer from './LocalCacheSlice';
import { CONFIG } from './../../../App/Config/constants';
import createCompressor from 'redux-persist-transform-compress';

const compressor = createCompressor();

const reducers = combineReducers({
	localStorage: persistReducer(
		{
			storage,
			key: 'storage',
			keyPrefix: `${CONFIG.APP_SHORT_NAME}-`,
			blacklist: ['openShareModal', 'activePage'],
			transforms: [compressor] as any,
		},
		LocalCacheReducer.reducer
	),
});

export default reducers;
