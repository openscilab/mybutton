import './index.scss';
import { useState } from 'react';
import Service from '@src/Components/Service';
import { Button, Col, Modal, Row, Tooltip, Whisper } from 'rsuite';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Telegram from '@assets/icons/services/telegram.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FaIcon from '@src/Components/FaIcon';
import { copyToClipboard } from '@src/Tools/Utils/React';

const GetButton = () => {
	const [url, setUrl] = useState('');
	const [open, setOpen] = useState(false);
	const [code, setCode] = useState('');
	const [isValid, setIsValid] = useState(true);
	const [showCode, setShowCode] = useState(false);
	const [openTooltip, setOpenTooltip] = useState(false);
	const [selectedServices, setSelectedServices] = useState<string[]>(['email']);

	// ? -------------------------- Functions ------------------------------
	const onAddService = (title: string) => {
		setSelectedServices([...selectedServices, title]);
	};

	const onRemoveService = (title: string) => {
		const filtered = selectedServices?.filter(service => service !== title);
		setSelectedServices(filtered);
	};

	const getCode = () => {
		if (!url || selectedServices.length === 0) {
			setIsValid(false);
			return;
		}
		setShowCode(true);
		const selected = Services(url).filter(service => selectedServices.includes(service.title));
		const code = `	<div>
			${selected
				.map(service => {
					return `<a href="${service.url}" target="_blank">
					<img src="${service.iconUrl}" width="32" height="32" style="background-color:${service.bg}; border-radius:6px"/>
			</a>`;
				})
				.join(`\n			`)}
	</div>`;
		setCode(code);
	};

	const finalUrl = (url: string) => {
		if (url.startsWith('https://') || url.startsWith('http://')) return url;

		return `http://${url}`;
	};

	// ? ---------------------- Var -------------------------------
	const Services = (url?: string) => [
		{
			title: 'email',
			icon: Email,
			iconUrl: 'https://github.com/openscilab/mybutton/raw/dev/src/Assets/icons/services/email.svg',
			bg: '#888990',
			url: `mailto:?subject=&body=${finalUrl(url || '')}`,
		},
		{
			title: 'gmail',
			icon: Gmail,
			iconUrl: 'https://github.com/openscilab/mybutton/raw/dev/src/Assets/icons/services/gmail.svg',
			bg: '#EA4335',
			url: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su&body=${finalUrl(url || '')}`,
		},
		{
			title: 'telegram',
			icon: Telegram,
			iconUrl: 'https://github.com/openscilab/mybutton/raw/dev/src/Assets/icons/services/telegram.svg',
			bg: '#2CA5E0',
			url: `https://telegram.me/share/url?url=${finalUrl(url || '')}&text=`,
		},
	];

	// ---------------------------------------------------------------------
	return (
		<div className='get-button-layout'>
			<div className='get-button-container'>
				<h1>Get share button code</h1>
				<div className='input-container'>
					{/* <label className='input-label'>Page url</label> */}
					<EditableInput
						label='Page URL'
						defaultValue={url}
						isValid={isValid}
						errorMessage='required'
						onChange={e => {
							if (!isValid) setIsValid(true);
							setUrl(e.target.value);
						}}
						placeholder='https://www.example.com'
					/>
				</div>
				<div className='buttons'>
					<Button className='choose' onClick={() => setOpen(true)}>
						Choose Services
					</Button>
					<Button className='get-code' onClick={getCode}>
						Get Code
					</Button>
				</div>
				{showCode && (
					<div className='code-container'>
						<SyntaxHighlighter language={'xml'} style={atelierCaveLight} children={code} />
						<Whisper
							className='copy-whisper'
							onClick={() => {
								if (!openTooltip) setOpenTooltip(true);
							}}
							onOpen={() => {
								setTimeout(() => {
									setOpenTooltip(false);
								}, 1500);
							}}
							open={openTooltip}
							placement='top'
							trigger='click'
							speaker={<Tooltip>Copied!</Tooltip>}>
							<div className='copy-icon'>
								<FaIcon
									fa='l-clone'
									onClick={async () => {
										await copyToClipboard(code);
									}}
								/>
							</div>
						</Whisper>
					</div>
				)}
			</div>
			<Modal open={open} size='sm' onClose={() => setOpen(false)} backdrop className='choose-services-modal'>
				<Modal.Header>Choose services</Modal.Header>
				<Modal.Body>
					<div className='services-list'>
						<Row>
							{Services().map((service, i) => {
								const checked = selectedServices.includes(service.title);
								return (
									<Col xs={12} sm={8} key={i}>
										<Service
											{...service}
											checked={checked}
											onSelect={onAddService}
											onRemove={onRemoveService}
										/>
									</Col>
								);
							})}
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpen(false)}>Done</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default GetButton;
