import FaIcon from '../../Components/FaIcon';
import { Notification, toaster } from 'rsuite';
import { IconNames } from '../../Assets/fontawesome/fa.names';
import { PlacementType } from 'rsuite/esm/toaster/ToastContainer';

export const isDev = process.env.NODE_ENV === 'development';

export const isProd = process.env.NODE_ENV === 'production';

type classIfType = { [key: string]: boolean };
export const classNames = (...entries: (string | classIfType)[]) => {
	let classes = '';
	entries.forEach(e => {
		if (typeof e === 'string') return (classes += e + ' ');
		classes += Object.entries(e || {})
			.filter(p => p[1] === true)
			.map(p => p[0])
			.join(' ');
	});
	return classes;
};

export const classes = (...entries: (string | classIfType)[]) => ({
	className: classNames(...(entries || [])),
});

export const clickOn = (selector: string) => (document.querySelector(selector) as any)?.click?.();

export const copyToClipboard = async (content: string) => {
	const type = 'text/plain';
	const blob = new Blob([content], { type: 'text/plain' });
	const data = [new ClipboardItem({ [type]: blob })];
	return await navigator.clipboard.write(data);
};

type NotifyOptions = {
	icon?: IconNames;
	duration?: number;
	className?: string;
	closable?: boolean;
	placement?: PlacementType;
	type?: 'success' | 'error' | 'info' | 'warning';
};

//---------RsuiteNotification-------------
export const notify = (message: string, options?: NotifyOptions) => {
	const type = options?.type;
	let interval = setInterval(() => {
		if (!!toaster?.push) {
			clearInterval(interval);
			toaster.push(
				<Notification
					type={type}
					className={classNames(`rs-custom-toast ${options?.className || ''} `, {
						'bg-error': type === 'error',
						'bg-primary': type === 'info',
						'bg-success': type === 'success',
						'bg-yellow-500': type === 'warning',
					})}
					duration={options?.duration || 4500}
					closable={options?.closable === undefined ? true : options?.closable}>
					{options?.icon && <FaIcon fa={options?.icon} />}
					{message}
				</Notification>,
				{ placement: options?.placement || 'bottomEnd' }
			);
		}
	}, 200);
};
//

export const Notify = {
	error: (message: string, options?: NotifyOptions) => {
		notify(message, { type: 'error', icon: 'l-xmark', ...(options || {}) });
	},
	info: (message: string, options?: NotifyOptions) => {
		notify(message, { type: 'info', icon: 'l-info', ...(options || {}) });
	},
	success: (message: string, options?: NotifyOptions) => {
		notify(message, { type: 'success', icon: 'l-check', ...(options || {}) });
	},
	warning: (message: string, options?: NotifyOptions) => {
		notify(message, { type: 'warning', icon: 'l-triangle-exclamation', ...(options || {}) });
	},
};
