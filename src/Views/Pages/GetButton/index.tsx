import './index.scss';
import { useState } from 'react';
import Service from '@src/Components/Service';
import { Button, Col, Modal, Row, Tooltip, Whisper } from 'rsuite';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Telegram from '@assets/icons/services/telegram.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import FaIcon from '@src/Components/FaIcon';
import { copyToClipboard } from '@src/Tools/Utils/React';
import useWindow from '@src/Tools/Hooks/useWindow';
import { useData } from '@src/Tools/Hooks/useData';

const GetButton = () => {
	const { isMobile } = useWindow();
	const [buttons, setButtons] = useState<JSX.Element>();
	const { set, temp } = useData({
		url: '',
		code: '',
		isValid: true,
		showCode: false,
		openModal: false,
		openTooltip: false,
	});
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
		if (!temp.url) {
			set.ou.temp('isValid', false);
			return;
		}
		if (selectedServices.length === 0) {
			set.ou.temp('showCode', false);
			return;
		}

		const selected = Services(temp.url).filter(service => selectedServices.includes(service.title));
		const buttons = (
			<div className='flex-center'>
				{selected.map((service, i) => {
					return (
						<a href={service.url} target='_blank' rel='noreferrer' key={i}>
							<img
								src={service.icon}
								width={32}
								height={32}
								style={{ backgroundColor: service.bg, borderRadius: 4, paddingLeft: 1, paddingRight: 1 }}
								alt=''
							/>
						</a>
					);
				})}
			</div>
		);
		setButtons(buttons);

		const code = `	<div>
			${selected
				.map(service => {
					return `<a href="${service.url}" target="_blank"><img src="${service.iconUrl}" width="32" height="32" style="background-color:${service.bg}; border-radius:4px"/></a>`;
				})
				.join(`\n			`)}
	</div>`;
		set.ou.temp('code', code);

		set.ou.temp('showCode', true);
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
			iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/email.svg',
			bg: '#888990',
			url: `mailto:?subject=&body=${finalUrl(url || '')}`,
		},
		{
			title: 'gmail',
			icon: Gmail,
			iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/gmail.svg',
			bg: '#EA4335',
			url: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su&body=${finalUrl(url || '')}`,
		},
		{
			title: 'telegram',
			icon: Telegram,
			iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/telegram.svg',
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
					<EditableInput
						label='Page URL'
						defaultValue={temp.url}
						isValid={temp.isValid}
						errorMessage='required'
						onChange={e => {
							if (!temp.isValid) {
								console.log(temp);
								set.ou.temp('isValid', true);
							}
							set.ou.temp('url', e.target.value);
						}}
						placeholder='https://www.example.com'
					/>
				</div>
				<div className='buttons'>
					<Button className='choose' onClick={() => set.ou.temp('openModal', true)}>
						Choose Services
					</Button>
					<Whisper
						disabled={selectedServices.length !== 0}
						placement={isMobile ? 'bottom' : 'top'}
						trigger='click'
						speaker={<Tooltip className='err-tooltip'>Please choose services!</Tooltip>}>
						<Button className='get-code' onClick={getCode}>
							Get Code
						</Button>
					</Whisper>
				</div>
				{temp.showCode && (
					<div className='code-container'>
						<SyntaxHighlighter language={'xml'} style={lightfair} children={temp.code} />
						<Whisper
							className='copy-whisper'
							onClick={() => {
								if (!temp.openTooltip) set.ou.temp('openTooltip', true);
							}}
							onOpen={() => {
								setTimeout(() => {
									set.ou.temp('openTooltip', false);
								}, 1500);
							}}
							open={temp.openTooltip}
							placement='top'
							trigger='click'
							speaker={<Tooltip className='copy-tooltip'>Copied!</Tooltip>}>
							<div className='copy-icon'>
								<FaIcon
									fa='l-clone'
									onClick={async () => {
										await copyToClipboard(temp.code);
									}}
								/>
							</div>
						</Whisper>
						<div className='services-button'>{buttons}</div>
					</div>
				)}
			</div>
			<Modal
				open={temp.openModal}
				size='sm'
				onClose={() => set.ou.temp('openModal', false)}
				backdrop
				className='choose-services-modal'>
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
					<Button onClick={() => set.ou.temp('openModal', false)}>Done</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default GetButton;
