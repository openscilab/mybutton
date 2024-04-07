import './index.scss';
import { Col, Modal, Row } from 'rsuite';
import useStore from '@src/Tools/Store/useStore';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import useDashboard from '@src/Tools/Hooks/useDashboard';
import Telegram from '@assets/icons/services/telegram.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { setOpenShareModal } from '@src/Tools/Store/actions/DashboardActions';
import { useState } from 'react';

const ShareModal = () => {
	const { openShareModal } = useDashboard();
	const { dispatch } = useStore();
	const [url, setUrl] = useState('');

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
				<EditableInput
					label='URL'
					onChange={e => {
						setUrl(e.target.value);
					}}
					placeholder='https://www.example.com'
				/>
				<div className='services-list'>
					<Row>
						{Services.map((service, i) => {
							return (
								<Col xs={8} key={i}>
									<div className='service-container'>
										<div className='service-logo' style={{ backgroundColor: service.bg }}>
											<img src={service.icon} alt={service.title} />
										</div>
										<h2>{service.title}</h2>
									</div>
								</Col>
							);
						})}
					</Row>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const Services = [
	{ title: 'email', icon: Email, bg: '#888990' },
	{ title: 'gmail', icon: Gmail, bg: '#EA4335' },
	{ title: 'telegram', icon: Telegram, bg: '#2CA5E0' },
];

export default ShareModal;
