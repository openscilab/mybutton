import IS from './IS';
export type Obj = Record<string | number, any>;

export const isEqualObjects = (...objects: object[]): boolean => {
	const first = JSON.stringify(recursiveSort(objects[0]));
	return objects.every((obj, i) => i === 0 || JSON.stringify(recursiveSort(obj)) === first);
};

export const isEmptyObject = (obj: OBJECT) => Object.keys(obj || {}).length === 0;

export const removeEmptyProps = (obj: OBJECT): OBJECT => {
	if (!IS.object(obj)) return obj;

	const newObj: OBJECT = { ...obj };
	const entries = Object.entries(newObj || {});
	entries?.forEach(([key, value]) => {
		if (IS.boolean(value)) return;
		if (IS.string(value) && obj[key] === '') return delete newObj[key];
	});

	return newObj;
};

export const sortObject = (obj: any[] | Record<string | number, any>) => {
	if (Array.isArray(obj)) return [...(obj || [])]?.sort();
	return (
		Object.keys(obj || {})
			.sort()
			// eslint-disable-next-line no-sequences
			.reduce((res, key) => ((res[key] = obj[key]), res), {} as any)
	);
};

export const recursiveSort = (obj: any[] | Record<string | number, any>) => {
	if (typeof obj !== 'object') return;
	let sortedObject: any = sortObject(obj);

	if (Array.isArray(sortedObject))
		sortedObject.forEach((item, i) => typeof item === 'object' && (sortedObject[i] = recursiveSort(item)));
	else
		Object.entries(sortedObject || {})?.forEach(
			([key, value]) => typeof value === 'object' && (sortedObject[key] = recursiveSort(value || []))
		);

	return sortedObject;
};

export const iterateOverObjects = (data: any, objMap: (obj: any, depth?: number) => any = x => x) => {
	data = deepClone(data);

	const recObjects = (data: any, objMap: (obj: any, depth?: number) => any = x => x, depth: number = 0): any => {
		if (!data || typeof data !== 'object') return data;

		//* Handle Array of Objects
		if (Array.isArray(data)) return data.map((x: any) => recObjects(x, objMap, depth + 1));

		// * Handle Single Object
		data = objMap(data, depth);
		Object.entries(data || {})?.forEach(([key, value]) => {
			if (!value || typeof value != 'object') return;
			data[key] = recObjects(value, objMap, depth + 1);
		});

		return data;
	};

	return recObjects(data, objMap);
};

export const renameKey = (object: any = {}, curName: string, newName: string) => {
	if (object?.[curName] || object?.[curName] === '') object[newName] = object?.[curName];
	delete object?.[curName];
};

export const isFormDataEmpty = (formData: FormData) => !formData?.entries()?.next()?.value;

export const deepClone = <T extends object = any>(object: T) => JSON.parse(JSON.stringify(object || {})) as T;

//*------------------------- 👇toJson -----------------------------
export const toJson = (data?: any, options: toJsonOptions = {}): any => {
	if (!data) return {};

	//* Single Object
	const { remove_empty = false } = options;

	//* Array
	if (IS.array(data)) return data?.map(d => toJson(d, options));

	let object = { ...data };

	object = iterateOverObjects(object, (obj, depth) => {
		if (IS.string(obj)) return obj;

		Object.entries(obj || {}).forEach(([key, value]) => {
			if (remove_empty && ((IS.string(value) && value === '') || (!IS.boolean(value) && !value))) delete obj?.[key];
			if (depth === (options?.depth ?? 0)) {
				if ([...(options?.block || [])].includes(key)) delete obj[key];
				if (options?.only && ![...(options?.only || [])].includes(key)) delete obj?.[key];
			}
		});

		if (options?.sortKeys) obj = sortObject(obj);

		return obj;
	});

	return object;
};

export type toJsonOptions = {
	only?: string[];
	depth?: number;
	block?: string[];
	sortKeys?: boolean;
	remove_empty?: boolean;
};

//*-------------------- Object Utils --------------------------------

export const OU = (obj: any) => {
	const set = (key: string | string[], value: any) => {
		let curObj = obj;
		const keys = IS.string(key) ? [...key?.split('.')] : key;
		for (let i = 0; i < keys.length; i++) {
			const curKey = keys?.[i];
			const isLast = i === keys?.length - 1;
			if (curObj?.[curKey] === undefined) curObj[curKey] = {};
			if (isLast) curObj[curKey] = value;
			curObj = curObj?.[curKey];
		}
		return obj;
	};

	return { set };
};

//*------------------- Object Diff -----------------------------------
export const diffObjects = (oldObj: any, newObj: any) => {
	const diff: any = {};
	const entries = Object.entries(newObj || {});

	entries?.forEach(([key, value]) => {
		const isBothArr = IS.array(oldObj[key]) && IS.array(value);
		const isBothObj = IS.object(oldObj[key]) && IS.object(value);

		if (isBothObj || isBothArr) {
			if (isEqualObjects(oldObj[key], value)) return;
			diff[key] = diffObjects(oldObj?.[key], value);
			return;
		}

		if (oldObj?.[key] === value) return;

		diff[key] = value;
	});

	return diff;
};
