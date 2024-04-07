import EditableInput from '@src/Components/EditableInput/EditableInput';
import './index.scss';
import { Button } from 'rsuite';
import ServicesModal from './ServicesModal';
import { useState } from 'react';

const GetButton = () => {
	const [open, setOpen] = useState(false);

	// ---------------------------------------------------------------------
	return (
		<div className='get-button-layout'>
			<div className='container'>
				<h1>Get share button code</h1>
				<div className='input-container'>
					<label className='input-label'>Page Url</label>
					<EditableInput label='Required' />
				</div>
				<div className='buttons'>
					<Button className='choose' onClick={() => setOpen(true)}>
						Choose Services
					</Button>
					<Button className='get-code'>Get Code</Button>
				</div>
			</div>
			<ServicesModal open={open} onClose={() => setOpen(false)} />
		</div>
	);
};

export default GetButton;
