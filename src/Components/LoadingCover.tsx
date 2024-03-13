import { Loader } from 'rsuite';

type LoadingCoverProps = { className?: string };

const LoadingCover: FC<LoadingCoverProps> = ({ className = '' }) => (
	<Loader className={'loading-cover ' + className} speed='slow' size='lg' center />
);

export default LoadingCover;
