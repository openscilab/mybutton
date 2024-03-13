import { useMemo, useEffect } from 'react';
import { useState, useCallback } from 'react';
import { deepClone, OU } from '../../Utils/Object';
import { isEqualObjects } from '../../Utils/Object';

type OU_Path = string | string[];

export const useData = <T extends OBJECT = any>(inputData: T, dependencies: any[] = []) => {
	const [data, setData] = useState<T>(deepClone(inputData));
	const [temp, setTempData] = useState<T>(deepClone(inputData));

	useEffect(() => {
		const cloned = deepClone(inputData);
		if (isEqualObjects(cloned, data)) return;
		setTempData(cloned);
		setData(cloned);
	}, dependencies);

	useEffect(() => {
		if (isEqualObjects(temp, data)) return;
		setTempData(deepClone(data));
	}, [data]);

	const set = {
		data: setData,
		temp: setTempData,
		ou: {
			data: (path: OU_Path, value: any) => setData(s => OU(deepClone(s)).set(path, value)),
			temp: (path: OU_Path, value: any) => setTempData(s => OU(deepClone(s)).set(path, value)),
		},
	};

	const discard = useCallback(() => {
		setTempData(data);
	}, [inputData, data]);

	const isChanged = useMemo(() => !isEqualObjects(data, temp), [data, temp]);

	return { set: useMemo(() => set, []), temp, data, discard, isChanged };
};
