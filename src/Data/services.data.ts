import X from '@assets/icons/services/x.svg';
import { ServiceName } from './constants.data';
import { CONFIG } from '@src/App/Config/constants';
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
import CustomShare from '@assets/icons/services/custom-share.svg';

export const getServiceURL = (url: string, subject?: string): { [key: string]: string } => {
	return {
		[ServiceName.Custom]: `${CONFIG.FRONT_DOMAIN}/?path=custom_share&link=${url}&subject=${subject}`,
		[ServiceName.Email]: `mailto:?subject=${subject}&body=${url}`,
		[ServiceName.Gmail]: `https://mail.google.com/mail/u/0/?ui=2&fs=1&tf=cm&su=${subject}&body=${url}`,
		[ServiceName.Telegram]: `https://telegram.me/share/url?url=${url}&text=${subject}`,
		[ServiceName.X]: `https://x.com/intent/post?url=${url}&text=${subject}`,
		[ServiceName.Whatsapp]: `https://api.whatsapp.com/send?text=${subject}%20${url}`,
		[ServiceName.Yahoo]: `http://compose.mail.yahoo.com/?subject=${subject}&body=${url}`,
		[ServiceName.HackerNews]: `https://news.ycombinator.com/submitlink?u=${url}&t=${subject}`,
		[ServiceName.Facebook]: `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${subject}`,
		[ServiceName.Linkedin]: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&text=${subject}`,
		[ServiceName.Reddit]: `https://www.reddit.com/submit?url=${url}&title=${subject}`,
		[ServiceName.Pinterest]: `https://www.pinterest.com/pin/create/button/?url=${url}&media=&description=${subject}`,
		[ServiceName.Blogger]: `https://www.blogger.com/blog_this.pyra?u=${url}&n=${subject}&t&pli=1`,
		[ServiceName.Trello]: `https://trello.com/add-card?name=${subject}&desc=${url}`,
	};
};

export const SERVICES = [
	{
		title: ServiceName.Custom,
		icon: CustomShare,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/custom-share.svg',
		bg: '#4b2b79',
	},
	{
		title: ServiceName.Email,
		icon: Email,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/email.svg',
		bg: '#888990',
	},
	{
		title: ServiceName.Gmail,
		icon: Gmail,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/gmail.svg',
		bg: '#EA4335',
	},
	{
		title: ServiceName.Telegram,
		icon: Telegram,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/telegram.svg',
		bg: '#2CA5E0',
	},
	{
		title: ServiceName.X,
		icon: X,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/x.svg',
		bg: '#1A1A1A',
	},
	{
		title: ServiceName.Whatsapp,
		icon: Whatsapp,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/whatsapp.svg',
		bg: '#12AF0A',
	},
	{
		title: ServiceName.Yahoo,
		icon: Yahoo,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/yahoo.svg',
		bg: '#400090',
	},
	{
		title: ServiceName.HackerNews,
		icon: HackerNews,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/hacker-news.svg',
		bg: '#ff6600',
	},
	{
		title: ServiceName.Facebook,
		icon: Facebook,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/facebook.svg',
		bg: '#0866ff',
	},
	{
		title: ServiceName.Linkedin,
		icon: Linkedin,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/linkedin.svg',
		bg: '#007bb5',
	},
	{
		title: ServiceName.Reddit,
		icon: Reddit,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/reddit.svg',
		bg: '#ff4500',
	},
	{
		title: ServiceName.Pinterest,
		icon: Pinterest,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/pinterest.svg',
		bg: '#e60023',
	},
	{
		title: ServiceName.Blogger,
		icon: Blogger,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/blogger.svg',
		bg: '#fda352',
	},
	{
		title: ServiceName.Trello,
		icon: Trello,
		iconUrl: 'https://github.com/openscilab/mybutton/raw/main/src/Assets/icons/services/trello.svg',
		bg: '#0079bf',
	},
];
