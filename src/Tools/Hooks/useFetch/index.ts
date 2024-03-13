import useAccount from '../useAccount';
import { Notify } from '../../Utils/React';
import useStore from '@tools/Store/useStore';
import { useCallback, useState } from 'react';
import useLoading from '../useLoading/useLoading';
import axios, { AxiosRequestConfig } from 'axios';
import { CONFIG } from '../../../App/Config/constants';
import { setUploadProgress } from '@tools/Store/actions/DashboardActions';

//? ----------------- 👇 Initial data ------------------------------------

const ReqInit: RequestOptions = { base: true, throwError: false };

//? -------------------- 👇 useFetch -------------------------------------

const useFetch = <T extends object | any = any>(fetchUrl?: string, fetchOptions?: RequestOptions) => {
	const loadings = useLoading();
	const { dispatch } = useStore();
	const { user, tokenRef } = useAccount();
	const [data, setData] = useState<null | T>(null);
	const [error, setError] = useState<boolean | any>(false);

	const setLoadingByMethod = (isLoading: boolean, method?: RequestMethods) => {
		loadings.set('all', isLoading);
		if (method) loadings.set(method, isLoading);
	};

	const onUploadProgress: OnUploadProgress = (event, percentage) => {
		dispatch(setUploadProgress(percentage));
		fetchOptions?.onUploadProgress?.(event, percentage);
	};

	const fetchByMethod = useCallback(
		(method: RequestMethods) => async (options?: RequestOptions) => {
			let json;

			setData(null);
			setError(false);
			setLoadingByMethod(true, method);

			const mergedOptions = { ...fetchOptions, ...options, onUploadProgress } as RequestOptions;
			const url = mergedOptions?.url || fetchUrl;
			if (!url) return;

			try {
				const ext_options = { ...mergedOptions, token: tokenRef?.current, method: method };
				const { json: res_json } = await authFetch(url, ext_options);
				json = res_json;
				setData(json);
				setLoadingByMethod(false, method);
				if (json?.error) throw new Error(`${json?.message}`);
			} catch (e) {
				setError(e);
				setData(null);
				setLoadingByMethod(false, method);
				throw e;
			}

			return json as T;
		},
		[fetchOptions, fetchUrl, CONFIG, user]
	);

	const LOADING = {
		loading: loadings.is('all'),
		getLoading: loadings.is('GET'),
		putLoading: loadings.is('PUT'),
		postLoading: loadings.is('POST'),
		deleteLoading: loadings.is('DELETE'),
		loadings: {
			all: loadings.is('all'),
			get: loadings.is('GET'),
			put: loadings.is('PUT'),
			post: loadings.is('POST'),
			delete: loadings.is('DELETE'),
		},
	};

	const FETCH_METHODS = {
		Get: fetchByMethod('GET'),
		Put: fetchByMethod('PUT'),
		Post: fetchByMethod('POST'),
		Delete: fetchByMethod('DELETE'),
	};

	return { data, error, ...LOADING, ...FETCH_METHODS };
};

//? --------------------- 👇 Utils ---------------------------------------

const extendOptions = (options: RequestOptions) => ({ ...ReqInit, ...options });

export const authFetch = async (url: string, options?: RequestOptions) => {
	let { token = window?.user_token, body } = options || {};
	let response: Response | undefined, status_code: any, json: any;

	if (!navigator.onLine) {
		//! if the internet is offline, throw an error
		const msg = 'You are offline. Please check your internet connection.';
		Notify.error(msg, { duration: 4000, icon: 'l-wifi-slash' });
		throw new Error(msg);
	}

	//? Handling Json and FormData
	const isFormData = body instanceof FormData;
	if (body && typeof body === 'object' && !isFormData) body = JSON.stringify(body);

	//? Options
	const fetchOptions = extendOptions({ ...options, body });
	fetchOptions.headers = {
		...fetchOptions.headers,
		...(!!token ? { Authorization: 'Bearer ' + token } : {}),
		...(!isFormData ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'multipart/form-data' }),
	};

	//? Handling Query params
	const params = fetchOptions?.params;
	let stringParam;
	if (params) {
		let entries: any[] = Object.entries(params || {}).filter(item => item[1] !== undefined);
		entries = entries.map(item => `${item[0]}=${item[1]}`);
		stringParam = '?' + entries.join('&');
	}

	//? Final Request Url
	let req_url = (fetchOptions.base ? CONFIG.SERVER : '') + url + (stringParam || '');

	//? Execute request using fetch or axios
	try {
		if (!isFormData) {
			response = await fetch(req_url, fetchOptions as RequestInit);
			status_code = response?.status;
			try {
				json = await response!!?.json();
			} catch {
				// do nothing
			}
		} else {
			const onUploadProgress = (event: ProgressEvent) => {
				const percentage = Math.round((100 * event.loaded) / event.total);
				options?.onUploadProgress?.(event, percentage);
			};

			const axios_options: AxiosRequestConfig = {
				url: req_url,
				data: fetchOptions?.body,
				...((fetchOptions as any) || {}),
				onUploadProgress,
			};

			const { data, status } = await axios.request(axios_options);

			json = data;
			status_code = status;
		}

		if (status_code >= 400) throw new Error(`Request Error ${status_code}`);

		//
	} catch (e) {
		if (options?.throwError) throw e;
	}

	return { json, response };
};

const authFetchByMethod = (method: RequestMethods) => async (url: string, options?: RequestOptions) =>
	await authFetch(url, { method: method, ...options });

authFetch.get = authFetchByMethod('GET');
authFetch.put = authFetchByMethod('PUT');
authFetch.post = authFetchByMethod('POST');
authFetch.delete = authFetchByMethod('DELETE');

export const objectToFormData = (obj: { [key: string]: string | Blob | undefined }) => {
	const formData = new FormData();
	Object.keys(obj || {}).forEach(key => obj[key] && formData.append(key, obj[key]!!));
	return formData;
};

//? ----------------------- 👇 Types ------------------------------------

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type OnUploadProgress = (event: ProgressEvent, percentage: number) => void;

export type RequestOptions = Omit<RequestInit, 'body'> & {
	url?: string;
	base?: boolean;
	token?: string;
	params?: object;
	throwError?: boolean;
	body?: object | string | BodyInit;
	onUploadProgress?: OnUploadProgress;
};

//? ----------------------- 👇 Export ------------------------------------

export default useFetch;
