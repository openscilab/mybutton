import X from '@assets/icons/services/x.svg';
import Email from '@assets/icons/services/email.svg';
import Gmail from '@assets/icons/services/gmail.svg';
import Yahoo from '@assets/icons/services/yahoo.svg';
import Reddit from '@assets/icons/services/reddit.svg';
import Trello from '@assets/icons/services/trello.svg';
import Blogger from '@assets/icons/services/blogger.svg';
import Telegram from '@assets/icons/services/telegram.svg';
import Whatsapp from '@assets/icons/services/whatsapp.svg';
import Facebook from '@assets/icons/services/facebook.svg';
import Linkedin from '@assets/icons/services/linkedin.svg';
import Pinterest from '@assets/icons/services/pinterest.svg';
import HackerNews from '@assets/icons/services/hacker-news.svg';

export const services_url = (url: string, subject?: string): { [key: string]: string } => {
	return {
		Email: `mailto:?subject=${subject}&body=${url}`,
		Gmail: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
		Telegram: `https://telegram.me/share/url?url=${url}&text=${subject}`,
		X: `https://x.com/intent/post?url=${url}&text=${subject}`,
		WhatsApp: `https://api.whatsapp.com/send?text=${subject}%20${url}`,
		'Yahoo Mail': `http://compose.mail.yahoo.com/?subject=${subject}&body=${url}`,
		'Hacker News': `https://news.ycombinator.com/submitlink?u=${url}&t=${subject}`,
		Facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${subject}`,
		LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&text=${subject}`,
		Reddit: `https://www.reddit.com/submit?url=${url}&title=${subject}`,
		Pinterest: `https://www.pinterest.com/pin/create/button/?url=${url}&media=&description=${subject}`,
		Blogger: `https://www.blogger.com/blog_this.pyra?u=${url}&n=${subject}&t&pli=1`,
		Trello: `https://trello.com/add-card?name=${subject}&desc=${url}`,
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
	{
		title: 'Facebook',
		icon: Facebook,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/facebook.svg',
		bg: '#0866ff',
	},
	{
		title: 'LinkedIn',
		icon: Linkedin,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/linkedin.svg',
		bg: '#007bb5',
	},
	{
		title: 'Reddit',
		icon: Reddit,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/reddit.svg',
		bg: '#ff4500',
	},
	{
		title: 'Pinterest',
		icon: Pinterest,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/pinterest.svg',
		bg: '#e60023',
	},
	{
		title: 'Blogger',
		icon: Blogger,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/blogger.svg',
		bg: '#fda352',
	},
	{
		title: 'Trello',
		icon: Trello,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/trello.svg',
		bg: '#0079bf',
	},
];
