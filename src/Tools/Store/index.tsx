// <reference types="redux-persist" />
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reducers from './slices';

export const store = configureStore({
	reducer: reducers,
	middleware: getDefMid => getDefMid({ serializableCheck: false }),
});

const Store: FC = ({ children }) => (
	<Provider store={store}>
		<PersistGate persistor={persistStore(store)}>{children}</PersistGate>
	</Provider>
);

export type StoreTypes = ReturnType<typeof store.getState>;

export default Store;
