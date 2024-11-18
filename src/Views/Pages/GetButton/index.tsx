import './index.scss';
import { useEffect, useState } from 'react';
import Service from '@src/Components/Service';
import useWindow from '@src/Tools/Hooks/useWindow';
import { useData } from '@src/Tools/Hooks/useData';
import { CONFIG } from '@src/App/Config/constants';
import { encode } from '@src/Tools/Utils/URLEncoding';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { copyToClipboard } from '@src/Tools/Utils/React';
import { Services, services_url } from '@src/Data/services.data';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ReactComponent as Clone } from '@assets/icons/clone-regular.svg';
import { Button, Col, Dropdown, Modal, Radio, RadioGroup, Row, Tooltip, Whisper } from 'rsuite';

const GetButton = () => {
	const { isMobile } = useWindow();
	const [buttons, setButtons] = useState<JSX.Element>();
	const { set, temp } = useData({
		url: '',
		code: '',
		subject: '',
		isValid: true,
		showCode: false,
		openModal: false,
		openTooltip: false,
		shareMode: 'direct',
		whisperOpen: false,
		dropdownOpen: false,
		urlEncoding: '',
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

	const getShareLink = (service_title: string, url: string) => {
		const path = `?path=share&service=${service_title}&subject=${temp.subject}&link=${url}`;
		if (temp.urlEncoding !== '') {
			const encoded_path = encode(path);
			return `${CONFIG.FRONT_DOMAIN}/?encoded=${encoded_path}`;
		}
		return `${CONFIG.FRONT_DOMAIN}/${path}`;
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

		const validated_url = urlValidation(temp.url || '');
		const selected = Services.filter(service => selectedServices.includes(service.title));
		const urls = services_url(validated_url, temp.subject);

		const buttons = (
			<div className='flex-center'>
				{selected.map((service, i) => {
					const href = temp.shareMode === 'direct' ? urls[service.title] : getShareLink(service.title, validated_url);
					return (
						<a href={href} target='_blank' rel='noreferrer' key={i}>
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
					const href = temp.shareMode === 'direct' ? urls[service.title] : getShareLink(service.title, validated_url);
					return `<a href="${href}" target="_blank"><img src="${service.iconUrl}" width="32" height="32" style="background-color:${service.bg}; border-radius:4px"/></a>`;
				})
				.join(`\n			`)}
	</div>`;
		set.ou.temp('code', code);

		set.ou.temp('showCode', true);
	};

	const urlValidation = (url: string) => {
		let validated = url;
		const decoded_url = decodeURIComponent(url);
		if (!url.includes('://')) {
			if (decoded_url.includes('://')) return validated;
			validated = `http://${url}`;
		}
		return encodeURIComponent(validated);
	};

	// ? ------------------------------ useEffect -------------------------------
	useEffect(() => {
		if (temp.showCode) getCode();
	}, [selectedServices, temp.shareMode, temp.urlEncoding]);
	// --------------------------------------------------------------------------
	return (
		<div className='get-button-layout'>
			<div className='get-button-container'>
				<h1>Get share button code</h1>
				<div className='input-container'>
					<EditableInput
						label='Link'
						defaultValue={temp.url}
						isValid={temp.isValid}
						errorMessage='required'
						onChange={e => {
							if (!temp.isValid) {
								set.ou.temp('isValid', true);
							}
							set.ou.temp('url', e.target.value);
						}}
						placeholder='https://www.example.com'
					/>
					<EditableInput
						label='Subject'
						onChange={e => {
							set.ou.temp('subject', e.target.value);
						}}
						defaultValue={temp.subject}
						placeholder='Subject'
					/>
				</div>
				<Whisper
					placement='top'
					controlId='control-id-hover'
					trigger='hover'
					open={!!temp.dropdownOpen ? false : temp.whisperOpen}
					speaker={
						<Tooltip className='share-mode-tooltip'>
							Choose to share your link directly on the selected services or do it through MyButton website.
						</Tooltip>
					}>
					<div
						className='radiogroup-whisper'
						onMouseEnter={() => set.ou.temp('whisperOpen', true)}
						onMouseLeave={() => set.ou.temp('whisperOpen', false)}>
						<RadioGroup
							name='radio-group-inline-picker-label'
							inline
							className='mode-picker'
							appearance='picker'
							defaultValue={temp.shareMode}
							onChange={value => set.ou.temp('shareMode', value)}>
							<label className='box-label'>Sharing Mode: </label>
							<Radio value='direct'>Direct</Radio>
							<Dropdown
								placement='bottomEnd'
								activeKey={temp.urlEncoding}
								className='encoding-dropdown'
								onOpen={() => set.ou.temp('dropdownOpen', true)}
								onClose={() => set.ou.temp('dropdownOpen', false)}
								renderToggle={(props, ref) => (
									<Radio {...props} ref={ref} value='indirect'>
										Indirect
									</Radio>
								)}>
								<Dropdown.Item
									eventKey={'informative'}
									className='relative'
									{...(temp.urlEncoding === 'informative'
										? {
												icon: (
													<Close
														onClick={e => {
															e.stopPropagation();
															set.ou.temp('urlEncoding', '');
														}}
													/>
												),
										  }
										: {})}
									onSelect={() => set.ou.temp('urlEncoding', 'informative')}>
									URL Encoding (most robustness)
								</Dropdown.Item>
							</Dropdown>
						</RadioGroup>
					</div>
				</Whisper>

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
								<Clone
									className='icon'
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
							{Services.map((service, i) => {
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
