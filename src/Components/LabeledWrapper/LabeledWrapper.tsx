import './LabeledWrapper.scss';
import { ReactNode } from 'react';
import { classNames } from '../../Tools/Utils/React';

export type LabeledWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
	hint?: string;
	label?: string;
	error?: boolean;
	editable?: boolean;
	innerComponent?: ReactNode;
	errorMessage?: string | false;
	innerComponentPosition?: 'left' | 'right';
};

const LabeledWrapper: FC<LabeledWrapperProps> = props => {
	const { innerComponent, innerComponentPosition = 'right' } = props;
	const { hint, label, onBlur, onFocus, children, errorMessage, error = false, editable = true, ...rest } = props;
	return (
		<div
			{...{ onFocus, onBlur }}
			className={classNames(`labeled-wrapper-container  ${rest?.className}`, {
				'labeled-wrapper-error': error,
				'labeled-wrapper-not-editable': !editable,
			})}>
			<div className='labeled-wrapper'>
				<div className='children'>
					{innerComponentPosition === 'left' && innerComponent}
					{children}
					{innerComponentPosition === 'right' && innerComponent}
				</div>
				{(label || error) && (
					<>
						<label className='label'>
							{label}
							{error && errorMessage !== false && <span className='error-msg'>{errorMessage}</span>}
							{hint && <span className='hint'>{hint}</span>}
						</label>
					</>
				)}
				<fieldset aria-hidden='true' className='labeled-wrapper-outline'>
					<legend>
						{label && <span className='label'>{label}</span>}
						{error && errorMessage && <span className='error-msg'>{errorMessage}</span>}
						{hint && <span className='hint'>{hint}</span>}
					</legend>
				</fieldset>
			</div>
		</div>
	);
};

export default LabeledWrapper;
