import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';

export const services_url = (url: string, subject?: string): { [key: string]: string } => {
	return {
		email: `mailto:?subject=${subject}&body=${url}`,
		gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
		telegram: `https://telegram.me/share/url?url=${url}&text=${subject}`,
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
];
