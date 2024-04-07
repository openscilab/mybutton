import { useState } from 'react';
import { Radio } from 'rsuite';

type Props = {
	bg: string;
	icon: string;
	title: string;
	checked?: boolean;
};

const Service = (props: Props) => {
	const [checked, setChecked] = useState(props.checked || false);

	// -------------------------------------------------------
	return (
		<Radio className='service-radio' checked={checked} onClick={() => setChecked(!checked)}>
			<div className='service-logo' style={{ backgroundColor: props.bg }}>
				<img src={props.icon} alt={props.title} />
			</div>
			<h2>{props.title}</h2>
		</Radio>
	);
};

export default Service;
