import { useState, useRef, useEffect } from 'react';
import './index.scss';

type Props = {
	children: React.ReactNode;
	text: string;
};

const ShareModeTooltip = ({ children, text }: Props) => {
	const [visible, setVisible] = useState(false);
	const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		};
	}, []);

	const clearHide = () => {
		if (hideTimerRef.current) {
			clearTimeout(hideTimerRef.current);
			hideTimerRef.current = null;
		}
	};

	const show = () => {
		clearHide();
		setVisible(true);
	};

	const scheduleHide = () => {
		clearHide();
		hideTimerRef.current = setTimeout(() => setVisible(false), 120);
	};

	return (
		<div className='share-mode-tooltip-wrapper' onMouseEnter={show} onMouseLeave={scheduleHide}>
			<div
				className={`share-mode-tooltip-popup${visible ? ' is-visible' : ''}`}
				role='tooltip'
				aria-hidden={!visible}>
				{text}
				<div className='share-mode-tooltip-arrow' />
			</div>
			{children}
		</div>
	);
};

export default ShareModeTooltip;
