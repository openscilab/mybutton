import EditableInput from '@src/Components/EditableInput/EditableInput';
import './index.scss';
import useDashboard from '@src/Tools/Hooks/useDashboard';
import { setOpenShareModal } from '@src/Tools/Store/actions/DashboardActions';
import useStore from '@src/Tools/Store/useStore';
import { Modal } from 'rsuite';
import useInputs from 'use-inputs';

const ShareModal = () => {
	const { register } = useInputs();
	const { openShareModal } = useDashboard();
	const { dispatch } = useStore();

	// --------------------------------------------------------------
	return (
		<Modal
			open={openShareModal}
			size='sm'
			onClose={() => dispatch(setOpenShareModal(false))}
			backdrop
			className='share-modal'>
			<Modal.Header />
			<Modal.Body>
				<EditableInput label='URL' {...register('url')} placeholder='https://www.example.com' />
				<div className='services-list'></div>
			</Modal.Body>
		</Modal>
	);
};

export default ShareModal;
