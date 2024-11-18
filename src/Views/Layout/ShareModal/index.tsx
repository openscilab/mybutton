import './index.scss';
import { useState } from 'react';
import useStore from '@src/Tools/Store/useStore';
import { CONFIG } from '@src/App/Config/constants';
import { encode } from '@src/Tools/Utils/URLEncoding';
import { Services, services_url } from '@src/Data/services.data';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { Col, Dropdown, Modal, Radio, RadioGroup, Row, Tooltip, Whisper } from 'rsuite';
import { setOpenShareModal, useLocalCache } from '@src/Tools/Store/slices/LocalCacheSlice';

const ShareModal = () => {
	const { dispatch } = useStore();
	const [url, setUrl] = useState('');
	const [subject, setSubject] = useState('');
	const { openShareModal } = useLocalCache();
	const [isValid, setIsValid] = useState(true);
	const [urlEncoding, setUrlEncoding] = useState('');
	const [shareMode, setShareMode] = useState('direct');
	const [whisperOpen, setWhisperOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// ? ------------------------- Functions -----------------------

	const urlValidation = (url: string) => {
		let validated = url;
		const decoded_url = decodeURIComponent(url);
		if (!url.includes('://')) {
			if (decoded_url.includes('://')) return validated;
			validated = `http://${url}`;
		}
		return encodeURIComponent(validated);
	};

	const getShareLink = (service_title: string, url: string) => {
		const path = `?path=share&service=${service_title}&subject=${subject}&link=${url}`;
		if (urlEncoding !== '') {
			const encoded_path = encode(path);
			return `${CONFIG.FRONT_DOMAIN}/?encoded=${encoded_path}`;
		}
		return `${CONFIG.FRONT_DOMAIN}/${path}`;
	};

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
					open={!!dropdownOpen ? false : whisperOpen}
					speaker={
						<Tooltip className='share-mode-tooltip'>
							Choose to share your link directly on the selected services or do it through MyButton website.
						</Tooltip>
					}>
					<div
						className='radiogroup-whisper'
						onMouseEnter={() => setWhisperOpen(true)}
						onMouseLeave={() => setWhisperOpen(false)}>
						<RadioGroup
							name='radio-group-inline-picker-label'
							inline
							className='mode-picker'
							appearance='picker'
							defaultValue={shareMode}
							onChange={value => setShareMode(value.toString())}>
							<label className='box-label'>Sharing Mode: </label>
							<Radio value='direct'>Direct</Radio>
							<Dropdown
								placement='bottomEnd'
								activeKey={urlEncoding}
								className='encoding-dropdown'
								onOpen={() => setDropdownOpen(true)}
								onClose={() => setDropdownOpen(false)}
								renderToggle={(props, ref) => (
									<Radio {...props} ref={ref} value='indirect'>
										Indirect
									</Radio>
								)}>
								<Dropdown.Item
									eventKey={'informative'}
									className='relative'
									{...(urlEncoding === 'informative'
										? {
												icon: (
													<Close
														onClick={e => {
															e.stopPropagation();
															setUrlEncoding('');
														}}
													/>
												),
										  }
										: {})}
									onSelect={() => setUrlEncoding('informative')}>
									URL Encoding (most robustness)
								</Dropdown.Item>
							</Dropdown>
						</RadioGroup>
					</div>
				</Whisper>
				<div className='services-list'>
					<Row>
						{Services.map((service, i) => {
							const validated_url = urlValidation(url);
							const href =
								shareMode === 'direct'
									? services_url(validated_url, subject)[service.title]
									: getShareLink(service.title, validated_url);
							return (
								<Col xs={12} sm={8} key={i}>
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
