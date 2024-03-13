import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const useQueryParams = () => {
	const navigate = useNavigate();
	const { search, pathname, hash } = useLocation();

	const addParam = (key: string, value: any) => {
		const paramsObject = paramsStringToObject(search);
		paramsObject[key] = value;
		navigate(pathname + paramsObjectToString(paramsObject) + hash, { replace: true });
	};

	const removeParam = (key: string) => {
		const paramsObject = paramsStringToObject(search);
		delete paramsObject[key];
		navigate(pathname + paramsObjectToString(paramsObject) + hash, { replace: true });
	};

	const modifyParams = (add: object = {}, remove: string[] = []) => {
		let paramsObject = paramsStringToObject(search);
		remove?.forEach(rm => delete paramsObject[rm]);
		paramsObject = { ...paramsObject, ...add };
		navigate(pathname + paramsObjectToString(paramsObject) + hash, { replace: true });
	};

	return {
		addParam,
		removeParam,
		modifyParams,
		updateParam: addParam,
		params: useMemo(() => paramsStringToObject(search), [search]),
	};
};

const paramsObjectToString = (obj: any) =>
	'?' +
	Object.entries(obj || {})
		.map(([key, value]) => `${key}=${value}`)
		?.join('&');

const paramsStringToObject = (query: string): Record<string, string> =>
	Array.from(new URLSearchParams(query)).reduce(
		(p, [k, v]) =>
			Object.assign({}, p, {
				[k]: p[k]
					? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v)
					: v?.includes(',')
					? v?.split(',')?.map(x => (/^\d+$/.test(x) ? +x : x))
					: v,
			}),
		{} as Record<string, string>
	);

export default useQueryParams;
