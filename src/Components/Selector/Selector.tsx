import './Selector.scss';
import useInputs from 'use-inputs';
import { useRef, useEffect } from 'react';
import { classNames } from '@tools/Utils/React';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { SelectPicker, SelectPickerProps } from 'rsuite';
import LabeledWrapper from '../LabeledWrapper/LabeledWrapper';
import { LabeledWrapperProps } from '../LabeledWrapper/LabeledWrapper';

type SelectorType = Omit<SelectPickerProps, 'data'> & LabeledWrapperProps & { data?: ItemDataType[] };

const Selector: FC<SelectorType> = props => {
	const { onWindowKeyDown } = useInputs();
	const { hint, data, label, error, className, errorMessage, editable = true, ...rest } = props;

	const SPRef = useRef<any>();
	const isFocusRef = useRef(false);

	useEffect(
		() =>
			onWindowKeyDown((e: any) => {
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
			className={classNames(`selector`, {
				[className || '']: true,
				'selector-is-editable': editable,
				'selector-not-editable': !editable,
			})}>
			<SelectPicker ref={SPRef} data={data || []} {...rest} />
		</LabeledWrapper>
	);
};

export default Selector;
