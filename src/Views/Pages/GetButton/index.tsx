import EditableInput from '@src/Components/EditableInput/EditableInput';
import './index.scss';
import { Button, Col, Modal, Row } from 'rsuite';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import { useState } from 'react';
import Service from '@src/Components/Service';

const GetButton = () => {
	const [open, setOpen] = useState(false);
	const [selectedServices, setSelectedServices] = useState<string[]>(['email']);

	// ? -------------------------- Functions ------------------------------
	const onAddService = (title: string) => {
		setSelectedServices([...selectedServices, title]);
	};

	const onRemoveService = (title: string) => {
		const filtered = selectedServices?.filter(service => service !== title);
		setSelectedServices(filtered);
	};

	// ---------------------------------------------------------------------
	return (
		<div className='get-button-layout'>
			<div className='get-button-container'>
				<h1>Get share button code</h1>
				<div className='input-container'>
					<label className='input-label'>Page url</label>
					<EditableInput label='required' />
				</div>
				<div className='buttons'>
					<Button className='choose' onClick={() => setOpen(true)}>
						Choose Services
					</Button>
					<Button className='get-code'>Get Code</Button>
				</div>
			</div>
			<Modal open={open} size='sm' onClose={() => setOpen(false)} backdrop className='choose-services-modal'>
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
					<Button onClick={() => setOpen(false)}>Done</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

const Services = [
	{ title: 'email', icon: Email, bg: '#888990' },
	{ title: 'gmail', icon: Gmail, bg: '#EA4335' },
	{ title: 'telegram', icon: Telegram, bg: '#2CA5E0' },
];

export default GetButton;
