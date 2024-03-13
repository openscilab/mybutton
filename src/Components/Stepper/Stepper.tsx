import './Stepper.scss';
import { Steps, StepsProps } from 'rsuite';
import { classNames } from '../../Tools/Utils/React';

type StepperProps = StepsProps & {
	curStep: number;
	onItemClick?: any;
	className?: string;
	stepsTitlesArr: string[];
};

const Stepper: FC<StepperProps> = ({ stepsTitlesArr, className, curStep, small, onItemClick }) => {
	return (
		<div className={`stepper ${className}`}>
			<Steps current={curStep} small={small}>
				{stepsTitlesArr?.map((ts, i) => (
					<Steps.Item
						key={i}
						title={ts}
						onClick={() => onItemClick?.(i)}
						className={classNames('step-item', { 'cursor-pointer': !!onItemClick })}
					/>
				))}
			</Steps>
		</div>
	);
};

export default Stepper;
