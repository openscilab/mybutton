import './EditableInput.scss';
import InputMask from 'react-input-mask';
import { classNames } from '../../Tools/Utils/React';
import { InputHTMLAttributes, ReactNode } from 'react';
import LabeledWrapper from '../LabeledWrapper/LabeledWrapper';

const EditableInput: FC<EditableInputProp> = inputProps => {
	const {
		mask,
		type,
		hint,
		label,
		lines,
		className,
		errorMessage,
		isValid = true,
		innerComponent,
		editable = true,
		autoFill = false,
		innerComponentPosition,
		...props
	} = inputProps;

	props.spellCheck = 'false';
	props.disabled = !editable;

	if (!autoFill) (props as any).autoComplete = 'new-password';

	let InputElement = <input autoComplete='off' {...props} type={type} />;

	if (lines && lines > 1) InputElement = <textarea {...props} rows={lines} />;

	if (mask) InputElement = <InputMask mask={mask} {...props} />;

	const errMsg = errorMessage !== undefined ? errorMessage : `Invalid`;

	return (
		<LabeledWrapper
			hint={hint}
			label={label}
			errorMessage={errMsg}
			error={editable ? !isValid : false}
			{...{ innerComponent, innerComponentPosition }}
			className={classNames(`editable-input`, {
				[className || '']: true,
				'editable-input-is-editable': editable,
				'editable-input-not-editable': !editable,
			})}>
			{InputElement}
		</LabeledWrapper>
	);
};

type EditableInputProp = InputHTMLAttributes<any> & {
	hint?: string;
	type?: string;
	mask?: string;
	label?: string;
	lines?: number;
	isValid?: boolean;
	autoFill?: boolean;
	editable?: boolean;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
	innerComponent?: ReactNode;
	errorMessage?: string | false;
	spellCheck?: 'false' | 'true';
	// errorPlacement?: 'bottom' | 'top';
	innerComponentPosition?: 'left' | 'right';
};

export default EditableInput;
