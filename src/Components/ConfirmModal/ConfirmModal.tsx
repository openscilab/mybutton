import Btn from '../BTN/BTN';
import './ConfirmModal.scss';
import { ReactNode, useState } from 'react';
import { Modal, ModalProps } from 'rsuite';
import { classNames } from '../../Tools/Utils/React';
import { IconNames } from '../../Assets/fontawesome/fa.names';

const ConfirmModal: FC<ConfirmModalProps> = ({
	header,
	onAccept,
	onReject,
	onCancel,
	children,
	bordered,
	className,
	btnSettings,
	size = 'xs',
	...rest
}) => {
	const hasFooter = !!onCancel || !!onReject || !!onAccept;

	const [loading, setLoading] = useState?.(false);

	return (
		<Modal
			size={size}
			className={classNames(`confirm-modal ${className || ''}`, {
				'rs-modal-no-border': !bordered,
			})}
			{...rest}>
			<Modal.Header>{header}</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			{hasFooter && (
				<Modal.Footer>
					{!!onCancel && (
						<Btn className='btn-cancel' onClick={() => onCancel?.()} fa={btnSettings?.cancel?.fa}>
							{btnSettings?.cancel?.title || 'cancel'}
						</Btn>
					)}
					{!!onReject && (
						<Btn className='btn-reject' onClick={() => onReject?.()} fa={btnSettings?.reject?.fa || 'l-xmark'}>
							{btnSettings?.reject?.title || 'no'}
						</Btn>
					)}
					{!!onAccept && (
						<Btn
							loading={loading}
							className='btn-accept'
							onClick={async () => {
								setLoading(true);
								await onAccept?.();
								setLoading(false);
							}}
							fa={btnSettings?.accept?.fa || 'l-check'}>
							{btnSettings?.accept?.title || 'yes'}
						</Btn>
					)}
				</Modal.Footer>
			)}
		</Modal>
	);
};

type ConfirmModalProps = ModalProps & {
	header?: ReactNode | string;
	onAccept?: Function;
	onReject?: Function;
	onCancel?: Function;
	bordered?: boolean;
	btnSettings?: {
		accept?: BtnSettingType;
		cancel?: BtnSettingType;
		reject?: BtnSettingType;
	};
};

type BtnSettingType = {
	title?: string;
	fa?: IconNames;
};

export default ConfirmModal;
