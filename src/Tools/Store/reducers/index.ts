import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import DashboardReducer from './DashboardReducer';
import LocalCacheReducer from './LocalCacheReducer';
import { CONFIG } from './../../../App/Config/constants';
import createCompressor from 'redux-persist-transform-compress';

const compressor = createCompressor();

const reducers = combineReducers({
	dashboard: DashboardReducer,
	localStorage: persistReducer(
		{
			storage,
			key: 'storage',
			keyPrefix: `${CONFIG.APP_SHORT_NAME}-`,
			blacklist: ['openShareModal'],
			transforms: [compressor] as any,
		},
		LocalCacheReducer
	),
});

export default reducers;
