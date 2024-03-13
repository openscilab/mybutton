import { useMemo } from 'react';
import { IS } from 'ahq-front-tools';
import { useLocation, useNavigate } from 'react-router-dom';

const useParamState = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const param = useMemo(() => paramOf(search), [search]);
	const params = useMemo(() => new URLSearchParams(search), [search]);

	//? ---------------------- 👇 Utils ------------------------- //

	const toString = () => {
		return params.toString();
	};

	const get = (key: string) => {
		const value = params.get(key) ?? undefined;
		if (value?.includes(',')) return value.split(',');
		return value;
	};

	const set = (key: string, value: string | string[]) => {
		if (IS.array(value)) value = value.join(',');
		params.set(key, value);
		navigate({ search: params.toString() }, { replace: true });
	};

	const setAll = (obj: { [key: string]: string | string[] }) => {
		for (const key in obj) set(key, obj[key]);
	};

	const remove = (key: string) => {
		params.delete(key);
		navigate({ search: params.toString() }, { replace: true });
	};

	const clear = () => {
		navigate({ search: '' }, { replace: true });
	};

	//----------------------------------------------------------------//

	return {
		set,
		get,
		clear,
		setAll,
		remove,
		toString,
		object: param?.object,
	};
};

export const paramOf = (search: string | OBJECT<any>) => {
	const param = { string: '', object: {} as OBJECT<any> };

	//* String
	if (IS.string(search)) {
		param.string = search;
		const params = new URLSearchParams(search);
		const entries = Array.from(params.entries());
		for (const [key, value] of entries) {
			if (value?.includes(',')) param.object[key] = value.split(',').map(x => (/^\d+$/.test(x) ? +x : x));
			else param.object[key] = value;
		}
	}

	//* Object
	if (IS.object(search)) {
		param.object = search;
		const params: string[] = [];
		const entries = Object.entries(search || {});
		for (const [key, value] of entries) {
			if (IS.array(value)) params.push(`${key}=${value.join(',')}`);
			else params.push(`${key}=${value}`);
		}
		param.string = params.join('&');
	}

	return param;
};

export default useParamState;
