import Loader from './Loader';

type LoadingCoverProps = { className?: string };

const LoadingCover: FC<LoadingCoverProps> = ({ className = '' }) => (
	<div className={'loading-cover ' + className}>
		<Loader />
	</div>
);

export default LoadingCover;
