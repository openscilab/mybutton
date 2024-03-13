import { CONFIG } from '@config/constants';
import { isEmail } from '../../Utils/String';
import { authFetch } from '../../Hooks/useFetch';
import { createHashId } from '@tools/Utils/String';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { clearLocalStorage } from './LocalCacheActions';

const LOGIN_ERROR_MESSAGE = 'Email and password are invalid';

//*---------------------- 👇 Actions -------------------------------------------------

//* LogOut
export const logout = createAction('logout');

//* Set Token
export const setUserToken = createAction<string>('setUserToken');

//* Login
export const login = createAsyncThunk<any, { email: any; password: any }>(
	'login',
	async ({ email, password }, { rejectWithValue, dispatch }) => {
		let data: any;

		const item: any = { email: email, password: password };

		if (!isEmail(email)) {
			delete item.email;
			item.username = email;
		}

		try {
			const { json } = await authFetch.post('/endpoints/login', { body: { item } });
			data = json;
			if (!data || data?.error) return rejectWithValue({ error: data?.message || '' });
			const isEqualPrev = isEqualToPrevUserInfo(data?.item);
			if (!isEqualPrev)
				await new Promise(resolve =>
					resolve(dispatch(clearLocalStorage({ init_loading: true, refresh_loading: false })))
				);
		} catch (e: any) {
			return rejectWithValue({ error: navigator.onLine ? LOGIN_ERROR_MESSAGE : e?.message });
		}

		return data.item;
	}
);

const isEqualToPrevUserInfo = (data: any) => {
	const lsName = `${CONFIG.APP_SHORT_NAME}-UA`;
	const prevHash = localStorage.getItem(lsName);
	const userData = { name: data?.role?.name, ID: data?.ID };
	const userIdHash = createHashId(JSON.stringify(userData));
	const isEqual = !!prevHash && userIdHash === prevHash;
	if (!isEqual) {
		localStorage.setItem(lsName, userIdHash);
		localStorage.removeItem('redirect-path-after-auth');
	}
	return isEqual;
};
