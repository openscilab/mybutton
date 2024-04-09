import { useState } from 'react';
import { Radio } from 'rsuite';

type Props = {
	bg: string;
	icon: string;
	title: string;
	checked?: boolean;
	onSelect: (title: string) => void;
	onRemove: (title: string) => void;
};

const Service = (props: Props) => {
	const [checked, setChecked] = useState(props.checked || false);

	// ? --------------------------- Functions --------------------------
	const onChange = () => {
		if (!checked) props.onSelect(props.title);
		else props.onRemove(props.title);

		setChecked(!checked);
	};

	// -------------------------------------------------------
	return (
		<Radio className='service-radio' checked={checked} onClick={onChange}>
			<div className='service-logo' style={{ backgroundColor: props.bg }}>
				<img src={props.icon} alt={props.title} />
			</div>
			<h2>{props.title}</h2>
		</Radio>
	);
};

export default Service;
