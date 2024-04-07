import './index.scss';
import { Button, Col, Modal, Row } from 'rsuite';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import Service from '../../../../Components/Service';

type Props = {
	open: boolean;
	onClose: () => void;
};

const ServicesModal: FC<Props> = (props: Props) => {
	return (
		<Modal open={props.open} size='sm' onClose={props.onClose} backdrop className='choose-services-modal'>
			<Modal.Header>
				<h1>Choose services</h1>
			</Modal.Header>
			<Modal.Body>
				<div className='services-list'>
					<Row>
						{Services.map((service, i) => {
							return (
								<Col xs={8} key={i}>
									<Service {...service} />
								</Col>
							);
						})}
					</Row>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button>Done</Button>
			</Modal.Footer>
		</Modal>
	);
};

const Services = [
	{ title: 'email', icon: Email, bg: '#888990' },
	{ title: 'gmail', icon: Gmail, bg: '#EA4335' },
	{ title: 'telegram', icon: Telegram, bg: '#2CA5E0' },
];

export default ServicesModal;
