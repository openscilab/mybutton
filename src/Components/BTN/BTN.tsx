import './BTN.scss';
import FaIcon from '../FaIcon';
import { Button, ButtonProps } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { Select, When } from 'tsx-statements';
import { classNames } from '../../Tools/Utils/React';
import { IconNames } from '../../Assets/fontawesome/fa.names';
import useLoading from '../../Tools/Hooks/useLoading/useLoading';

const Btn: FC<BtnProps> = ({
	fa,
	icon,
	goBack,
	onClick,
	loading,
	children,
	className,
	indicator,
	iconPlacement,
	childRenderClass,
	...rest
}) => {
	const navigate = useNavigate();
	const load = useLoading();

	const finalIcon = (
		<Select>
			<When condition={!!icon}>{icon as any}</When>
			<When condition={!!fa}>
				<FaIcon
					fa={fa!!}
					className={classNames({
						indicator: indicator || false,
						'end-icon': iconPlacement === 'end',
						'start-icon': iconPlacement === 'start',
						'center-icon': iconPlacement === 'center',
					})}
				/>
			</When>
		</Select>
	);

	const buttonChild = (
		<div
			className={
				childRenderClass ||
				classNames('flex', {
					'ml-1': iconPlacement === 'end',
					'mr-1': iconPlacement === 'start',
				})
			}>
			{['start', undefined].includes(iconPlacement) && (
				<>
					{finalIcon}
					{indicator && <FaIcon fa='l-pipe' className='indicator' />}
				</>
			)}
			<div>{children}</div>
			{iconPlacement === 'center' && finalIcon}
			{iconPlacement === 'end' && (
				<>
					{indicator && <FaIcon fa='l-pipe' className='indicator' />}
					{finalIcon}
				</>
			)}
		</div>
	);

	return (
		<Button
			loading={loading || load.is('btn')}
			className={classNames(`fa-btn ${fa} ${className}`, {
				'text-opacity-0': loading || false,
				'no-indicator': !(indicator || false),
			})}
			onClick={async e => {
				goBack && navigate(-1);
				if (onClick) {
					load.set('btn', true);
					await onClick?.(e);
					load.set('btn', false);
				}
			}}
			{...rest}>
			{buttonChild}
		</Button>
	);
};

type BtnProps = ButtonProps & {
	fa?: IconNames;
	icon?: Element;
	goBack?: boolean;
	loading?: boolean;
	className?: string;
	indicator?: boolean;
	childRenderClass?: string;
	iconPlacement?: 'start' | 'end' | 'center';
};

export default Btn;
