import './InputSelector.scss';
import { classNames } from '@tools/Utils/React';
import { InputPicker, InputPickerProps } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import LabeledWrapper from '../LabeledWrapper/LabeledWrapper';
import { LabeledWrapperProps } from '../LabeledWrapper/LabeledWrapper';

type InputSelectorType = Omit<InputPickerProps, 'data'> & LabeledWrapperProps & { data?: ItemDataType[] };

const InputSelector: FC<InputSelectorType> = props => {
	const {
		hint,
		data,
		label,
		error,
		className,
		errorMessage,
		disabled,
		innerComponent,
		editable = true,
		innerComponentPosition,
		...rest
	} = props;
	return (
		<div className='input-selector'>
			<LabeledWrapper
				{...{
					hint,
					label,
					error,
					editable,
					errorMessage,
					innerComponent,
					innerComponentPosition,
				}}
				className={classNames({
					[className || '']: true,
					'input-selector-is-editable': !!editable,
					'input-selector-not-editable': !editable,
				})}>
				<InputPicker data={data || []} {...rest} />
			</LabeledWrapper>
		</div>
	);
};

export default InputSelector;
