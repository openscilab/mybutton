import './index.scss';
import { useState } from 'react';
import useStore from '@src/Tools/Store/useStore';
import { CONFIG } from '@src/App/Config/constants';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { Col, Modal, Radio, RadioGroup, Row, Tooltip, Whisper } from 'rsuite';
import { setOpenShareModal, useLocalCache } from '@src/Tools/Store/slices/LocalCacheSlice';

const ShareModal = () => {
	const { dispatch } = useStore();
	const [url, setUrl] = useState('');
	const [subject, setSubject] = useState('');
	const { openShareModal } = useLocalCache();
	const [isValid, setIsValid] = useState(true);
	const [shareMode, setShareMode] = useState('direct');

	// ? ------------------------- Functions -----------------------

	const urlValidation = (url: string) => {
		if (url.includes('://')) return url;

		return `http://${url}`;
	};

	const getShareLink = (service_title: string, url: string) => {
		return `${CONFIG.FRONT_DOMAIN}/?path=share&service=${service_title}&subject=${subject}&link=${url}`;
	};

	// ? ---------------------- Var -------------------------------
	const services_url = (): { [key: string]: string } => {
		return {
			email: `mailto:?subject=${subject}&body=${url}`,
			gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
			telegram: `https://telegram.me/share/url?url=${url}&text=${subject}`,
		};
	};

	const Services = [
		{
			title: 'email',
			icon: Email,
			bg: '#888990',
		},
		{
			title: 'gmail',
			icon: Gmail,
			bg: '#EA4335',
		},
		{
			title: 'telegram',
			icon: Telegram,
			bg: '#2CA5E0',
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
						label='Link'
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
				<Whisper
					placement='top'
					controlId='control-id-hover'
					trigger='hover'
					speaker={
						<Tooltip className='share-mode-tooltip'>
							Choose to share your link directly on the selected services or do it through MyButton website.
						</Tooltip>
					}>
					<div className='radiogroup-whisper'>
						<RadioGroup
							name='radio-group-inline-picker-label'
							inline
							className='mode-picker'
							appearance='picker'
							defaultValue={shareMode}
							onChange={value => setShareMode(value.toString())}>
							<label className='box-label'>Sharing Mode: </label>
							<Radio value='direct'>Direct</Radio>
							<Radio value='indirect'>Indirect</Radio>
						</RadioGroup>
					</div>
				</Whisper>
				<div className='services-list'>
					<Row>
						{Services.map((service, i) => {
							const validated_url = urlValidation(url);
							const href =
								shareMode === 'direct'
									? services_url()[service.title]
									: getShareLink(service.title, validated_url);
							return (
								<Col xs={8} key={i}>
									<div
										className='service-container'
										onClick={() => {
											if (url === '') setIsValid(false);
											else window.open(href, '_blank');
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
