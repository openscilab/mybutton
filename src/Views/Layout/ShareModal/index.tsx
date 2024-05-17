import './index.scss';
import { Col, Modal, Row } from 'rsuite';
import { useState } from 'react';
import useStore from '@src/Tools/Store/useStore';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import useLocalCache from '@src/Tools/Hooks/useLocalCache';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { setOpenShareModal } from '@src/Tools/Store/actions/LocalCacheActions';

const ShareModal = () => {
	const { dispatch } = useStore();
	const [url, setUrl] = useState('');
	const [subject, setSubject] = useState('');
	const { openShareModal } = useLocalCache();
	const [isValid, setIsValid] = useState(true);

	// ? ------------------------- Functions -----------------------

	const finalUrl = (url: string) => {
		if (url.startsWith('https://') || url.startsWith('http://')) return url;

		return `http://${url}`;
	};

	// ? ---------------------- Var -------------------------------
	const Services = [
		{
			title: 'email',
			icon: Email,
			bg: '#888990',
			url: `mailto:?subject=${subject}&body=${finalUrl(url)}`,
		},
		{
			title: 'gmail',
			icon: Gmail,
			bg: '#EA4335',
			url: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${finalUrl(url)}`,
		},
		{
			title: 'telegram',
			icon: Telegram,
			bg: '#2CA5E0',
			url: `https://telegram.me/share/url?url=${finalUrl(url)}&text=${subject}`,
		},
	];
	// --------------------------------------------------------------
	return (
		<Modal
			open={openShareModal}
			size='sm'
			onClose={() => {
				dispatch(setOpenShareModal(false));
				setIsValid(true);
			}}
			backdrop
			className='share-modal'>
			<Modal.Header>Share to</Modal.Header>
			<Modal.Body>
				<div className='editable-input-container'>
					<EditableInput
						label='URL'
						onChange={e => {
							if (!isValid) setIsValid(true);
							setUrl(e.target.value);
						}}
						errorMessage='required'
						isValid={isValid}
						placeholder='https://www.example.com'
					/>
					<EditableInput
						label='Subject'
						onChange={e => {
							setSubject(e.target.value);
						}}
						placeholder='Subject'
					/>
				</div>
				<div className='services-list'>
					<Row>
						{Services.map((service, i) => {
							return (
								<Col xs={8} key={i}>
									<div
										className='service-container'
										onClick={() => {
											if (url === '') setIsValid(false);
											else window.open(service.url, '_blank');
										}}>
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

export default ShareModal;
