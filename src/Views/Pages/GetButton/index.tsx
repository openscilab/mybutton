import './index.scss';
import { useEffect, useState } from 'react';
import Service from '@src/Components/Service';
import { ValueType } from 'rsuite/esm/Checkbox';
import useStore from '@src/Tools/Store/useStore';
import useWindow from '@src/Tools/Hooks/useWindow';
import { useData } from '@src/Tools/Hooks/useData';
import { CONFIG } from '@src/App/Config/constants';
import { classes } from '../../../Tools/Utils/React';
import { encode } from '@src/Tools/Utils/URLEncoding';
import { ServiceName, SharingMode } from '@src/Data/constants.data';
import { Prism as SyntaxHighlighterPrism } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { copyToClipboard } from '@src/Tools/Utils/React';
import { SERVICES, getServiceURL } from '@src/Data/services.data';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { setShareModal } from '@src/Tools/Store/slices/LocalCacheSlice';
import { ReactComponent as Clone } from '@assets/icons/clone-regular.svg';
import { Button, Checkbox, CheckboxGroup, Col, Modal, Radio, RadioGroup, Row, Tooltip, Whisper } from 'rsuite';
import ShareModeTooltip from '@src/Components/ShareModeTooltip';
import { toStandardName } from '@src/Tools/Utils/Standardize';

// Default export is highlight.js; Prism theme + markup need the Prism build (React 18 types are loose)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeHighlighter = SyntaxHighlighterPrism as any;

const GetButton = () => {
	const { isMobile } = useWindow();
	const [buttons, setButtons] = useState<JSX.Element>();
	const { dispatch } = useStore();
	const { set, temp } = useData({
		url: '',
		code: '',
		subject: '',
		isValid: true,
		showCode: false,
		openModal: false,
		openTooltip: false,
		shareMode: SharingMode.Direct,
		encodingValue: [],
	});
	const [selectedServices, setSelectedServices] = useState<string[]>([ServiceName.Email]);
	const services = temp.shareMode === SharingMode.Indirect ? SERVICES : SERVICES.filter(s => s.title !== ServiceName.Custom);

	// Indirect: default first choice is Custom; Direct: Email. Keep multi-select when switching modes.
	useEffect(() => {
		if (temp.shareMode === SharingMode.Indirect) {
			setSelectedServices(prev => {
				if (prev.length === 1 && prev[0] === ServiceName.Email) {
					return [ServiceName.Custom];
				}
				return prev;
			});
		} else {
			setSelectedServices(prev => {
				const next = prev.filter(s => s !== ServiceName.Custom);
				return next.length === 0 ? [ServiceName.Email] : next;
			});
		}
	}, [temp.shareMode]);

	// ? -------------------------- Functions ------------------------------
	const onAddService = (title: string) => {
		setSelectedServices(prev => (prev.includes(title) ? prev : [...prev, title]));
	};

	const onRemoveService = (title: string) => {
		setSelectedServices(prev => prev.filter(service => service !== title));
	};

	const getShareLink = (service_title: string, url: string) => {
		const serviceName = toStandardName(service_title);
		const path = `?path=share&service=${serviceName}&subject=${temp.subject}&link=${url}`;
		if (!!temp.encodingValue?.[0]) {
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
		const selected = SERVICES.filter(service => selectedServices.includes(service.title));
		const urls = getServiceURL(validated_url, temp.subject);

		const buttons = (
			<div className='flex-center'>
				{selected.map((service, i) => {
					const href = temp.shareMode === 'direct' ? urls[service.title] : getShareLink(service.title, validated_url);
					return (
						<a
							href={href}
							{...(service.title === ServiceName.Custom
								? {
										onClick: e => {
											openShareModal(e, temp.url);
										},
								  }
								: {})}
							target='_blank'
							rel='noreferrer'
							key={i}>
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

		const lines = selected.map(service => {
			const href = temp.shareMode === 'direct' ? urls[service.title] : getShareLink(service.title, validated_url);
			return `<a href="${href}" target="_blank"><img src="${service.iconUrl}" width="32" height="32" style="background-color:${service.bg}; border-radius:4px"/></a>`;
		});
		const code = `<div>\n${lines.join('\n')}\n</div>`;
		set.ou.temp('code', code);

		set.ou.temp('showCode', true);
	};

	const urlValidation = (url: string) => {
		const decoded_url = decodeURIComponent(url);
		if (!url.includes('://')) {
			if (decoded_url.includes('://')) return url;
		}
		return encodeURIComponent(url);
	};

	const onCheckboxChanged = (val: ValueType | undefined, checked: boolean) => {
		if (checked && val) set.ou.temp('encodingValue', [val]);
		else set.ou.temp('encodingValue', []);
	};

	const openShareModal = (e: any, url: string) => {
		e.preventDefault();
		dispatch(setShareModal({ open: true, url, subject: temp.subject }));
	};

	// ? ------------------------------ useEffect -------------------------------
	useEffect(() => {
		if (temp.showCode) getCode();
	}, [selectedServices, temp.shareMode, temp.encodingValue.length]);
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
				<ShareModeTooltip text='Choose to share your link directly on the selected services or do it through MyButton website.'>
					<div className='radiogroup-whisper'>
						<RadioGroup
							name='radio-group-inline-picker-label'
							inline
							className='mode-picker'
							appearance='picker'
							defaultValue={temp.shareMode}
							onChange={value => set.ou.temp('shareMode', value)}>
							<label className='box-label'>Sharing Mode: </label>
							<Radio value={SharingMode.Direct}>Direct</Radio>
							<Radio value={SharingMode.Indirect}>Indirect</Radio>
						</RadioGroup>
					</div>
				</ShareModeTooltip>
				<div
					{...classes('encoding-mode-checkbox ', {
						'is-visible': temp.shareMode === SharingMode.Indirect,
					})}>
					<CheckboxGroup inline name='checkbox-group' value={temp.encodingValue}>
						<Checkbox value='base64' onChange={onCheckboxChanged}>
							Base64 Encoding (more robust)
						</Checkbox>
					</CheckboxGroup>
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
						<div className='get-code-block'>
							<CodeHighlighter
								language='markup'
								style={oneLight}
								customStyle={{
									margin: 0,
									padding: '1rem 1.35rem',
									paddingRight: '2.75rem',
									background: 'transparent',
									maxHeight: `min(50vh, ${Math.min(320, 88 + selectedServices.length * 26)}px)`,
									overflow: 'auto',
									overflowX: 'auto',
									fontSize: '0.8125rem',
									lineHeight: 1.55,
									whiteSpace: 'pre',
								}}
								codeTagProps={{
									style: {
										fontFamily:
											'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "Liberation Mono", monospace',
										fontVariantLigatures: 'none',
										whiteSpace: 'pre',
									},
								}}>
								{temp.code}
							</CodeHighlighter>
						</div>
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
							{services.map(service => {
								const checked = selectedServices.includes(service.title);
								return (
									<Col xs={12} sm={8} key={service.title}>
										<Service {...service} checked={checked} onSelect={onAddService} onRemove={onRemoveService} />
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
