import './CheckSelector.scss';
import useInputs from 'use-inputs';
import { useRef, useEffect } from 'react';
import { classNames } from '@tools/Utils/React';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { CheckPicker, CheckPickerProps } from 'rsuite';
import LabeledWrapper from '../LabeledWrapper/LabeledWrapper';
import { LabeledWrapperProps } from '../LabeledWrapper/LabeledWrapper';

type SelectorType = Omit<CheckPickerProps, 'data'> & LabeledWrapperProps & { data?: ItemDataType[] };

const CheckSelector: FC<SelectorType> = props => {
	const { onWindowKeyDown } = useInputs();
	const { hint, data, label, error, className, errorMessage, editable = true, ...rest } = props;

	const SPRef = useRef<any>();
	const isFocusRef = useRef(false);

	useEffect(
		() =>
			onWindowKeyDown(e => {
				if (!isFocusRef.current || !e?.code?.includes('Arrow')) return;
				SPRef?.current?.open?.();
			}),
		[]
	);

	if (!rest?.placeholder && !editable) rest.placeholder = 'Not Selected';

	return (
		<LabeledWrapper
			{...{ label, hint, error, errorMessage }}
			onBlur={() => (isFocusRef.current = false)}
			onFocus={() => (isFocusRef.current = true)}
			className={classNames(`check-selector`, {
				[className || '']: true,
				'check-selector-is-editable': editable,
				'check-selector-not-editable': !editable,
			})}>
			<CheckPicker data={data || []} {...rest} />
		</LabeledWrapper>
	);
};

export default CheckSelector;
