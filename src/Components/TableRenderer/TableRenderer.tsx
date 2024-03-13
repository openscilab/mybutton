import './TableRenderer.scss';
import FaIcon from '../FaIcon';
import PanelLoader from '../PanelLoader';
import { Else, If } from 'tsx-statements';
import { classNames } from '../../Tools/Utils/React';
import { ReactNode, useEffect, useMemo } from 'react';
import useMounted from '../../Tools/Hooks/useMountedState/useMounted';
import { useTable, useSortBy, CellProps, useExpanded, usePagination, DefaultSortTypes } from 'react-table';

const TableRenderer: FC<TableRendererProps> = props => {
	const { pageSize: pageSizeProp, pageIndex: pageIndexProp, noDataText } = props;
	const { loading, cols = [], data = [], onDataChange, defaultSortKey, share } = props;
	const { counterColumn = false, startColColor = 'dark', defaultSortType = 'dsc' } = props;

	const { isMounted } = useMounted();

	//? Memorize Table data
	const memoData = useMemo(() => data || [], [data]);

	//? Memorize Table columns
	const memoCol = useMemo(() => {
		const newCols = cols.map(c => ({ ...c, Header: c.Header || c.label, accessor: c.accessor || c.key }));
		const counterCol = {
			Header: '#',
			maxWidth: 50,
			accessor: 'counter-column',
			Cell: ({ row }: any) => <div className='font-bold opacity-90'>{+row?.index + 1}</div>,
		};
		if (counterColumn) newCols.unshift(counterCol);
		return newCols || [];
	}, [cols]);

	//? Memorize Table plugins
	const plugins: any[] = useMemo(() => {
		const hasSort = memoCol?.some(c => !!c?.sortable);
		return [...(hasSort ? [useSortBy] : []), useExpanded, usePagination];
	}, [memoCol]);

	//? Table options
	const tableOptions: any = {
		manual: true,
		data: memoData,
		columns: memoCol,
		autoResetSortBy: false,
		initialState: {
			share,
			pageSize: pageSizeProp,
			pageIndex: pageIndexProp,
			...(defaultSortKey ? { sortBy: [{ id: defaultSortKey, desc: defaultSortType !== 'dsc' }] } : {}),
		},
	};

	const tableConfig = useTable(tableOptions, ...plugins);

	const { headerGroups, rows } = tableConfig;

	const { page, gotoPage, setPageSize } = tableConfig as any;

	const { getTableProps, getTableBodyProps, prepareRow } = tableConfig;

	const isPagination = pageIndexProp !== undefined && pageSizeProp !== undefined;

	//?------------------- useEffects --------------------------------------------//

	useEffect(() => {
		onDataChange?.(data);
	}, [data]);

	useEffect(() => {
		setTimeout(() => {
			if (!isMounted.current) return;
			if (pageSizeProp !== undefined) setPageSize(pageSizeProp);
			if (pageIndexProp !== undefined) gotoPage(pageIndexProp);
		}, 0);
	}, [pageSizeProp, pageIndexProp]);

	useEffect(() => {
		if (!isMounted.current) return;
		if (data?.length > (pageIndexProp || 0) * (pageSizeProp || 0)) return;
		const i = ~~(data?.length / (pageSizeProp || 1));
		gotoPage(i);
		(props as any)?.set?.page(i);
	}, [data]);

	//?--------------------------------------------------------------------------//

	const SortBox = (column: any) => {
		let sortIcon = <FaIcon fa='s-sort' />;
		if (column?.isSorted)
			sortIcon = <FaIcon fa={column?.isSortedDesc ? 'd-arrow-up-short-wide' : 'd-arrow-down-wide-short'} />;
		return <div className='th-sort-icon'>{sortIcon}</div>;
	};

	return (
		<div className={classNames('react-table', `react-table-start-col-${startColColor}`)}>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, i) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={i}>
							{headerGroup.headers.map((column: any, j) => {
								const { minWidth, maxWidth, flexGrow, width } = column;
								return (
									<th
										key={j}
										{...column.getHeaderProps(
											column?.sortable ? column?.getSortByToggleProps?.() : undefined
										)}
										className={classNames({
											'th-sorted': column?.isSorted,
											'th-sortable': column?.sortable,
										})}
										style={{
											flexGrow: flexGrow,
											width: width + 'px',
											minWidth: minWidth + 'px',
											maxWidth: maxWidth + 'px',
										}}>
										{column.render('Header')}
										<If condition={column?.sortable}>{SortBox(column)}</If>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<If condition={loading}>
					<PanelLoader loading={true} />
					<Else>
						<tbody {...getTableBodyProps()}>
							{(isPagination ? page : rows).map((row: any, i: any) => {
								prepareRow(row);
								return (
									<tr key={i} {...row?.getRowProps()} className={classNames({ 'tr-child': row?.depth !== 0 })}>
										{row?.cells?.map((cell: any, j: any) => {
											const { width, prefix, postfix, maxWidth, minWidth, flexGrow } = cell?.column;
											return (
												<td
													key={j + Math.random()}
													{...cell?.getCellProps()}
													style={{
														flexGrow: flexGrow,
														width: width + 'px',
														minWidth: minWidth + 'px',
														maxWidth: maxWidth + 'px',
													}}>
													{prefix}
													{cell?.render('Cell', { share })}
													{postfix}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</Else>
				</If>
			</table>
			<If condition={!loading && (memoData?.length === 0 || !data)}>
				<div className='table-no-record'>{noDataText ?? 'No Records Found'}</div>
			</If>
		</div>
	);
};

export type RowDataType = {
	[key: string]: any;
	subRows?: RowDataType[];
};

export type ColDataType = {
	id?: string;
	Header?: any;
	prefix?: any;
	postfix?: any;
	width?: number;
	accessor?: string;
	flexGrow?: number;
	minWidth?: number;
	maxWidth?: number;
	sortable?: boolean;
	key?: any; // deprecated , use accessor
	label?: any; // deprecated , use Header
	sortType?: DefaultSortTypes | ((a: any, b: any) => number);
	Cell?: (props: CellProps<any> & { share: any }) => ReactNode;
};

export type TableRendererProps = {
	share?: any;
	data: object[];
	loading?: boolean;
	pageSize?: number;
	pageIndex?: number;
	cols: ColDataType[];
	noDataText?: string;
	defaultSortKey?: string;
	counterColumn?: boolean;
	defaultSortType?: 'dsc' | 'asc';
	startColColor?: 'dark' | 'light';
	onDataChange?: (data: any) => void;
};

export default TableRenderer;
