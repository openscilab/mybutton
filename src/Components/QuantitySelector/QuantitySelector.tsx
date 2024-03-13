import FaIcon from '../FaIcon';
import './QuantitySelector.scss';
import useInputs from 'use-inputs';
import { If } from 'tsx-statements';
import { useState, useEffect } from 'react';
import { classNames, Notify } from '../../Tools/Utils/React';

const QuantitySelector: FC<QSProp> = props => {
	const { onChange, defaultValue = 0, className, editable = true, min = 0, max = 1000000, value } = props;

	const [quantity, setQuantity] = useState(defaultValue || value || min);

	const { register, valueOf, onInputKeyDown } = useInputs({
		validation: { quantity: { validChars: /^\d*$/ } },
	});

	const increase = () =>
		setQuantity(s => {
			if (max !== undefined && s >= max) return s;
			else return s + 1;
		});

	const decrease = () =>
		setQuantity(s => {
			return s > min ? s - 1 : s;
		});

	const input_quantity = valueOf('quantity');

	useEffect(() => {
		let qty = +input_quantity;
		if (max < qty || qty < min) return;
		onChange?.(quantity);
	}, [quantity]);

	useEffect(() => {
		if (value !== undefined) setQuantity(value);
	}, [value]);

	useEffect(() => {
		setQuantity(+input_quantity);
	}, [input_quantity]);

	useEffect(() => {
		onInputKeyDown(e => {
			if (e?.code === 'ArrowDown') decrease();
			if (e?.code === 'ArrowUp') increase();
		});
	}, []);

	const onBlur = () => {
		let qty = +input_quantity;
		if (qty < min) {
			Notify.info('Quantity must be greater than or equal to ' + min?.toLocaleString('en'));
			qty = min;
		}
		if (qty > max) {
			Notify.info('Quantity must be less than or equal to ' + max?.toLocaleString('en'));
			qty = max;
		}
		setQuantity(qty);
	};

	let input_width = input_quantity?.length || 1;
	input_width = input_width * (input_width < 3 ? 18 : 12);

	return (
		<div className={`quantity-selector ${className ?? ''}`}>
			<If condition={editable}>
				<FaIcon
					fa='l-minus'
					onClick={decrease}
					className={classNames({ 'pointer-events-none no-visible': quantity === min })}
				/>
			</If>
			<div className={classNames('quantity', { 'pointer-events-none': !editable })}>
				<form autoComplete='off'>
					<input
						style={{ width: input_width + 'px' }}
						onClick={(e: any) => e?.target?.select?.()}
						{...register('quantity', { defaultValue: `${quantity || 0}`, onBlur })}
					/>
				</form>
			</div>
			<If condition={editable}>
				<FaIcon
					fa='l-plus'
					onClick={increase}
					className={classNames({ 'pointer-events-none no-visible': quantity === max })}
				/>
			</If>
		</div>
	);
};

export type QSProp = {
	min?: number;
	max?: number;
	value?: number;
	editable?: boolean;
	className?: string;
	defaultValue?: number;
	onChange?: (quantity: number) => void;
};

export default QuantitySelector;
