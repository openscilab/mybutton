// <reference types="redux-persist" />
import { Provider } from 'react-redux';
import { createStateSyncMiddleware } from 'redux-state-sync';

import { isDev } from '../Utils/React';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './reducers';
import persistStore from 'redux-persist/es/persistStore';

const stateSyncConfig = { blacklist: ['persist/PERSIST', 'persist/REHYDRATE'] };

export const store = configureStore({
	devTools: isDev,
	reducer: reducers,
	middleware: getDefMid => {
		const mids = getDefMid({ serializableCheck: false });
		mids.push(createStateSyncMiddleware(stateSyncConfig));
		return mids;
	},
});

const Store: FC = ({ children }) => (
	<Provider store={store}>
		<PersistGate persistor={persistStore(store)}>{children}</PersistGate>
	</Provider>
);

export type StoreTypes = ReturnType<typeof store.getState>;

export default Store;
