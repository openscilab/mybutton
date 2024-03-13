import { Progress } from 'rsuite';
import './CircularProgressBar.scss';

type ProgressBarProps = { percent?: number; className?: string };

// you can change degree of rotate from scss file
const CircularProgressBar: FC<ProgressBarProps> = ({ percent, className }) => {
	return (
		<div className={`circular-progress-bar ${className}`}>
			<Progress.Circle trailWidth={3} strokeWidth={5} percent={percent} trailColor='#E5E9EB' strokeColor='#0388CC' />
		</div>
	);
};

export default CircularProgressBar;
