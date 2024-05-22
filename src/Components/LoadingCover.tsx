import { ReactComponent as Loader } from '@assets/icons/circles.svg';

type LoadingCoverProps = { className?: string };

const LoadingCover: FC<LoadingCoverProps> = ({ className = '' }) => (
	<div className={'loading-cover ' + className}>
		<Loader className={'loading-cover-loader ' + className} />
	</div>
);

export default LoadingCover;
