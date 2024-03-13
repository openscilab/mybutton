import { createReducer } from '@reduxjs/toolkit';
import { removeFaIconCache } from '@tools/Utils/Cache';
import { login, logout, setUserToken } from '../actions/AccountActions';

const initState: AccountType = {
	error: '',
	loading: false,
	loggedIn: false,
	user: {
		ID: '',
		name: '',
		token: '',
		email: '',
		username: '',
		SYSTEM_USER_ID: '',
	},
};

const AccountReducer = createReducer(initState, {
	//? Logout
	[logout.type]: (state, _) => {
		removeFaIconCache();
		window.user_token = undefined;
		return { user: null, loading: false, loggedIn: false, error: '' };
	},

	//? Login
	[login.pending.type]: (state, { payload }) => {
		window.user_token = undefined;
		return { user: null, loading: true, loggedIn: false, error: '' };
	},
	[login.rejected.type]: (state, { payload }) => {
		window.user_token = undefined;
		return { user: null, loading: false, loggedIn: false, error: payload.error };
	},
	[login.fulfilled.type]: (state, { payload }) => {
		window.user_token = payload.token;
		return { user: payload, loggedIn: true, loading: false, error: '' };
	},

	//? set token
	[setUserToken.type]: (state, { payload }) => {
		window.user_token = payload;
		return { ...state, user: { ...state?.user!!, token: payload } };
	},
});

export type UserAccountType = null | {
	ID: string;
	name: string;
	email: string;
	token: string;
	username: string;
	SUPPLIER_ID?: string;
	REP_GROUP_ID?: string;
	SYSTEM_USER_ID?: string;
	role?: { name: ROLE_NAME };
	status?: 'ACTIVE' | 'DISABLED';
	CLASS_NAME?: 'SYSTEM_USER' | 'REP_GROUP' | 'SUPPLIER';
};

export type AccountType = {
	error: string;
	loading: boolean;
	loggedIn: boolean;
	user: UserAccountType;
};

export type ROLE_NAME =
	| 'PACK_AND_SHIP'
	| 'SYSTEM_ADMIN'
	| 'FULFILLMENT'
	| 'ORDER_ENTRY'
	| 'SUPER_ADMIN'
	| 'LOGISTICS'
	| 'ARTWORK'
	| 'SUPPLIER'
	| 'REP_GROUP';

export default AccountReducer;
