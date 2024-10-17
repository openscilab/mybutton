import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import Whatsapp from '@assets/icons/services/whatsapp.svg';
import X from '@assets/icons/services/x.svg';

export const services_url = (url: string, subject?: string): { [key: string]: string } => {
	return {
		email: `mailto:?subject=${subject}&body=${url}`,
		gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
		telegram: `https://telegram.me/share/url?url=${url}&text=${subject}`,
		x: `https://x.com/intent/post?url=${url}&text=${subject}`,
		whatsapp: `https://api.whatsapp.com/send?text=${subject}%20${url}`,
	};
};

export const Services = [
	{
		title: 'email',
		icon: Email,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/email.svg',
		bg: '#888990',
	},
	{
		title: 'gmail',
		icon: Gmail,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/gmail.svg',
		bg: '#EA4335',
	},
	{
		title: 'telegram',
		icon: Telegram,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/telegram.svg',
		bg: '#2CA5E0',
	},
	{
		title: 'x',
		icon: X,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/x.svg',
		bg: '#1A1A1A',
	},
	{
		title: 'whatsapp',
		icon: Whatsapp,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/whatsapp.svg',
		bg: '#12AF0A',
	},
];
