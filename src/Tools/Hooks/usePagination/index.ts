import { useState, useEffect, useMemo } from 'react';
import useParamState from '../useParamState/useParamState';

const usePagination = (options: OptionsType = defaultOptions) => {
	const [data, setData] = useState<any>();
	const param = useParamState();
	const [pageSize, setPageSize] = useState<number>(options?.initialPageSize || 10);
	const [pageIndex, setPageIndex] = useState<number>(options?.initialPageIndex || 0);

	//?------------------- useEffects --------------------------------------------//

	useEffect(() => {
		if (!options?.withParams) return;
		if (param.get('page') !== undefined) setPageIndex(+(param.get('page') || 1) - 1 || 0);
		if (param.get('limit') !== undefined) setPageSize(+(param.get('limit') || 0) || 20);
	}, []);

	useEffect(() => {
		if (!options?.withParams) return;
		param.set('page', `${pageIndex + 1}`);
		param.set('limit', `${pageSize}`);
	}, [pageSize, pageIndex]);

	//?-----------------------------------------------------------------------------//

	const registerTable = {
		pageSize: useMemo(() => pageSize, [pageSize]),
		pageIndex: useMemo(() => pageIndex, [pageIndex]),
		onDataChange: (data: any) => setData(data),
		set: {
			page: (n: number) => setPageIndex(n),
			size: (n: number) => setPageSize(n),
		},
	};

	const hidden = !data?.length || data.length <= pageSize;
	const registerPagination = {
		limit: pageSize,
		total: data?.length,
		activePage: pageIndex + 1,
		onChangePage: (v: number) => setPageIndex(v - 1),
		...(hidden ? { style: { display: 'none' } } : {}),
	};

	return {
		pageSize,
		pageIndex,
		setPageSize,
		setPageIndex,
		registerTable,
		registerPagination,
	};
};

type OptionsType = {
	withParams?: boolean;
	initialPageSize?: number;
	initialPageIndex?: number;
};

const defaultOptions: OptionsType = {
	withParams: false,
	initialPageSize: 10,
	initialPageIndex: 0,
};

export default usePagination;
