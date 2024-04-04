import { Modal } from 'rsuite';

type Props = {
	open: boolean;
	onClose: () => void;
};

const ServicesModal: FC<Props> = (props: Props) => {
	return (
		<Modal open={props.open} size='sm' onClose={props.onClose} backdrop className='share-modal'>
			<Modal.Header />
			<Modal.Body>
				<div className='services-list'></div>
			</Modal.Body>
		</Modal>
	);
};

export default ServicesModal;
