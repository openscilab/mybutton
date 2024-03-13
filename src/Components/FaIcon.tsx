import { IconNames } from '../Assets/fontawesome/fa.names';
import svgBundle from '../Assets/fontawesome/fa.bundle.svg';
import { useEffect, MouseEventHandler, CSSProperties } from 'react';
import useMountedState from '../Tools/Hooks/useMountedState/useMountedState';

const isDev = process.env.NODE_ENV === 'development';

const FaIcon: FC<FaIconProps> = ({ fa, onClick, className = '', style }) => {
	const [svgTag, setSvgTag] = useMountedState<string>();
	const [svgBase, setSvgBase] = useMountedState(svgBundle);

	useEffect(() => {
		if (svgTag === '#' + fa) return;
		setSvgTag('#' + fa);
		if (isDev) importSvg[fa[0]]().then(s => setSvgBase(s.default));
	}, [fa]);

	const IconElement = (
		<svg style={style} onClick={onClick} viewBox='0 0 10 10' className={`fa-icon ${fa} ${className}`}>
			<use xlinkHref={svgBase + svgTag} />
		</svg>
	);

	return IconElement;
};

const dynamicSvg = (name: string) => () => import(`../Assets/fontawesome/svg/${name}.fa.svg`);
let importSvg: { [key: string]: () => Promise<typeof import('*.svg')> } = {
	t: dynamicSvg('thin'),
	l: dynamicSvg('light'),
	s: dynamicSvg('solid'),
	b: dynamicSvg('brands'),
	r: dynamicSvg('regular'),
	d: dynamicSvg('duotone'),
};

type FaIconProps = {
	fa: IconNames;
	className?: string;
	style?: CSSProperties;
	onClick?: MouseEventHandler<SVGSVGElement>;
};

export default FaIcon;
