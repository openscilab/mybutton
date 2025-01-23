import './index.scss';
import { ValueType } from 'rsuite/esm/Checkbox';
import useStore from '@src/Tools/Store/useStore';
import { classes } from '@src/Tools/Utils/React';
import { CONFIG } from '@src/App/Config/constants';
import { encode } from '@src/Tools/Utils/URLEncoding';
import { SERVICES, getServiceURL } from '@src/Data/services.data';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { setOpenShareModal, useLocalCache } from '@src/Tools/Store/slices/LocalCacheSlice';
import { Checkbox, CheckboxGroup, Col, Modal, Radio, RadioGroup, Row, Tooltip, Whisper } from 'rsuite';
import { useSearchParams } from 'react-router-dom';
import { useData } from '@src/Tools/Hooks/useData';

const ShareModal = () => {
	const { dispatch } = useStore();
	const urlParams = useSearchParams()[0];
	const path = urlParams.get('path');
	const { openShareModal } = useLocalCache();
	const { set, temp, discard } = useData(
		{
			url: path === 'custom_share' ? urlParams.get('link') || '' : '',
			subject: path === 'custom_share' ? urlParams.get('subject') || '' : '',
			isValid: true,
			encodingValue: [],
			shareMode: 'direct',
		},
		[urlParams]
	);

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
		const path = `?path=share&service=${service_title}&subject=${temp.subject}&link=${url}`;
		if (temp.encodingValue?.length) {
			const encoded_path = encode(path);
			return `${CONFIG.FRONT_DOMAIN}/?encoded=${encoded_path}`;
		}
		return `${CONFIG.FRONT_DOMAIN}/${path}`;
	};

	const onCheckboxChanged = (val: ValueType, checked: boolean) => {
		if (checked) set.ou.temp('encodingValue', [val]);
		else set.ou.temp('encodingValue', []);
	};

	// --------------------------------------------------------------
	return (
		<Modal
			open={openShareModal}
			size='sm'
			onClose={() => {
				dispatch(setOpenShareModal(false));
				discard();
			}}
			backdrop
			className='share-modal'>
			<Modal.Header>Share to</Modal.Header>
			<Modal.Body>
				<div className='editable-input-container'>
					<EditableInput
						label='Link'
						onChange={e => {
							if (!temp.isValid) set.ou.temp('isValid', true);
							set.ou.temp('url', e.target.value);
						}}
						value={temp.url}
						errorMessage='required'
						isValid={temp.isValid}
						placeholder='https://www.example.com'
					/>
					<EditableInput
						label='Subject'
						value={temp.subject}
						onChange={e => {
							set.ou.temp('subject', e.target.value);
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
							defaultValue={temp.shareMode}
							onChange={value => set.ou.temp('shareMode', value.toString())}>
							<label className='box-label'>Sharing Mode: </label>
							<Radio value='direct'>Direct</Radio>
							<Radio value='indirect'>Indirect</Radio>
						</RadioGroup>
					</div>
				</Whisper>
				<div
					{...classes('encoding-mode-checkbox ', {
						'is-visible': temp.shareMode === 'indirect',
					})}>
					<CheckboxGroup inline name='checkbox-group' value={temp.encodingValue}>
						<Checkbox value='base64' onChange={onCheckboxChanged}>
							Base64 Encoding (more robust)
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div className='services-list'>
					<Row>
						{SERVICES.map((service, i) => {
							const validated_url = urlValidation(temp.url);
							const href =
								temp.shareMode === 'direct'
									? getServiceURL(validated_url, temp.subject)[service.title]
									: getShareLink(service.title, validated_url);
							return (
								<Col xs={12} sm={8} key={i}>
									<div
										className='service-container'
										onClick={() => {
											if (temp.url === '') set.ou.temp('isValid', false);
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
