import './DateSelector.scss';
import FaIcon from '../FaIcon';
import { If } from 'tsx-statements';
import { DatePicker, DatePickerProps } from 'rsuite';
import LabeledWrapper, { LabeledWrapperProps } from '../LabeledWrapper/LabeledWrapper';

type DateSelectorProps = DatePickerProps & LabeledWrapperProps;

const DateSelector: FC<DateSelectorProps> = props => {
	const { hint, label, error, className, errorMessage, editable, ...rest } = props;

	if (rest.value === undefined) rest.value = null as any;

	return (
		<div className={`date-selector ${className}`}>
			<LabeledWrapper
				{...{ hint, label, error, editable, errorMessage }}
				innerComponentPosition='left'
				innerComponent={
					<If condition={editable || editable === undefined}>
						<div className='inner-icons-wrapper'>
							<FaIcon fa='s-calendar' />
							<FaIcon fa='r-angle-down' />
						</div>
					</If>
				}>
				<DatePicker oneTap format='MM/dd/yyyy' className='date-picker' placeholder='MM/DD/YYYY' {...rest} />
			</LabeledWrapper>
		</div>
	);
};

export default DateSelector;
