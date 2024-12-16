import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import Whatsapp from '@assets/icons/services/whatsapp.svg';
import Yahoo from '@assets/icons/services/yahoo.svg';
import HackerNews from '@assets/icons/services/hacker-news.svg';
import X from '@assets/icons/services/x.svg';

export const services_url = (url: string, subject?: string): { [key: string]: string } => {
	return {
		Email: `mailto:?subject=${subject}&body=${url}`,
		Gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
		Telegram: `https://telegram.me/share/url?url=${url}&text=${subject}`,
		X: `https://x.com/intent/post?url=${url}&text=${subject}`,
		WhatsApp: `https://api.whatsapp.com/send?text=${subject}%20${url}`,
		'Yahoo Mail': `http://compose.mail.yahoo.com/?subject=${subject}&body=${url}`,
		'Hacker News': `https://news.ycombinator.com/submitlink?u=${url}&t=${subject}`,
	};
};

export const Services = [
	{
		title: 'Email',
		icon: Email,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/email.svg',
		bg: '#888990',
	},
	{
		title: 'Gmail',
		icon: Gmail,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/gmail.svg',
		bg: '#EA4335',
	},
	{
		title: 'Telegram',
		icon: Telegram,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/telegram.svg',
		bg: '#2CA5E0',
	},
	{
		title: 'X',
		icon: X,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/x.svg',
		bg: '#1A1A1A',
	},
	{
		title: 'WhatsApp',
		icon: Whatsapp,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/whatsapp.svg',
		bg: '#12AF0A',
	},
	{
		title: 'Yahoo Mail',
		icon: Yahoo,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/yahoo.svg',
		bg: '#400090',
	},
	{
		title: 'Hacker News',
		icon: HackerNews,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/hacker-news.svg',
		bg: '#ff6600',
	},
];
