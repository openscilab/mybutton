import { Checkbox } from 'rsuite';

type Props = {
	bg: string;
	icon: string;
	title: string;
	checked?: boolean;
	onSelect: (title: string) => void;
	onRemove: (title: string) => void;
};

/**
 * Multi-select row. Checkbox matches real behavior (toggle on/off from the whole label);
 * native Radio does not uncheck when clicking the label while selected.
 */
const Service = (props: Props) => {
	const checked = !!props.checked;

	const handleChange = (_value: unknown, nextChecked: boolean) => {
		if (nextChecked) {
			props.onSelect(props.title);
		} else {
			props.onRemove(props.title);
		}
	};

	return (
		<Checkbox className='service-radio' checked={checked} value={props.title} onChange={handleChange}>
			<div className='service-logo' style={{ backgroundColor: props.bg }}>
				<img src={props.icon} alt='' draggable={false} />
			</div>
			<h2>{props.title}</h2>
		</Checkbox>
	);
};

export default Service;
