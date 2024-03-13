import './Pagination.scss';
import { Pagination as RSuitPagination, PaginationProps } from 'rsuite';

const Pagination: FC<PaginationProps> = ({ maxButtons = 5, first = true, last = true, ...rest }) => {
	return (
		<div className='pagination-layout'>
			<RSuitPagination prev next {...rest} size='xs' last={last} first={first} maxButtons={maxButtons} />
		</div>
	);
};

export default Pagination;
