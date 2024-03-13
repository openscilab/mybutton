import './Chip.scss';

type ChipProps = {
	// chip background color(suggest from defined color in ColorSet)(default: 'bg-primary')
	color?: ColorSet;

	// optional className
	className?: string;

	// onClick function
	onClick?: () => any;

	// circular chip or rectangular chip(default: true)
	roundedFull?: boolean;

	// optional text color
	textColor?: textColorSet;

	style?: React.CSSProperties;
};

const Chip: FC<ChipProps> = ({
	style,
	onClick,
	children,
	className,
	roundedFull = true,
	color = 'bg-primary',
	textColor = 'text-white',
}) => {
	return (
		<div
			{...{ onClick, style, children }}
			className={`chip ${color} ${roundedFull ? 'rounded-full' : 'rounded-md'} ${textColor} ${className}`}
		/>
	);
};

export default Chip;

export type ColorSet =
	| 'bg-white'
	| 'bg-primary'
	| 'bg-magenta'
	| 'bg-red-dark'
	| 'bg-red-base'
	| 'bg-secondary'
	| 'bg-red-light'
	| 'bg-blue-dark'
	| 'bg-blue-base'
	| 'bg-cyan-base'
	| 'bg-cyan-dark'
	| 'bg-gray-base'
	| 'bg-gray-dark'
	| 'bg-pink-base'
	| 'bg-pink-dark'
	| 'bg-blue-light'
	| 'bg-green-dark'
	| 'bg-green-base'
	| 'bg-cyan-light'
	| 'bg-gray-light'
	| 'bg-pink-light'
	| 'bg-yellow-dark'
	| 'bg-yellow-base'
	| 'bg-green-light'
	| 'bg-orange-dark'
	| 'bg-orange-base'
	| 'bg-purple-dark'
	| 'bg-purple-base'
	| 'bg-lavender-50'
	| 'bg-yellow-light'
	| 'bg-orange-light'
	| 'bg-purple-light'
	| 'bg-lavender-100'
	| 'bg-lavender-200'
	| 'bg-lavender-300'
	| 'bg-lavender-400'
	| 'bg-lavender-500'
	| 'bg-lavender-600'
	| 'bg-lavender-700'
	| 'bg-lavender-800'
	| 'bg-lavender-900'
	| 'bg-orange-50'
	| 'bg-orange-100'
	| 'bg-orange-200'
	| 'bg-orange-300'
	| 'bg-orange-400'
	| 'bg-orange-500'
	| 'bg-orange-600'
	| 'bg-orange-700'
	| 'bg-orange-800'
	| 'bg-orange-900'
	| 'bg-green-emerald'
	| 'bg-rebeccapurple-base'
	| 'bg-rebeccapurple-light'
	| 'bg-rebeccapurple-dark'
	| string;

export type textColorSet =
	| 'text-white'
	| 'text-primary'
	| 'text-magenta'
	| 'text-red-dark'
	| 'text-red-base'
	| 'text-secondary'
	| 'text-red-light'
	| 'text-blue-dark'
	| 'text-blue-base'
	| 'text-cyan-base'
	| 'text-cyan-dark'
	| 'text-gray-base'
	| 'text-gray-dark'
	| 'text-blue-light'
	| 'text-green-dark'
	| 'text-green-base'
	| 'text-cyan-light'
	| 'text-gray-light'
	| 'text-yellow-dark'
	| 'text-yellow-base'
	| 'text-green-light'
	| 'text-orange-dark'
	| 'text-orange-base'
	| 'text-purple-dark'
	| 'text-purple-base'
	| 'text-yellow-light'
	| 'text-orange-light'
	| 'text-purple-light'
	| 'text-green-emerald';
