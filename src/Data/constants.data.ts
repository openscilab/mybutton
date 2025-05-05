export enum ServiceName {
	X = 'X',
	Email = 'Email',
	Gmail = 'Gmail',
	Reddit = 'Reddit',
	Trello = 'Trello',
	Blogger = 'Blogger',
	Yahoo = 'Yahoo Mail',
	Telegram = 'Telegram',
	Whatsapp = 'WhatsApp',
	Facebook = 'Facebook',
	Linkedin = 'LinkedIn',
	Custom = 'Custom Share',
	Pinterest = 'Pinterest',
	HackerNews = 'Hacker News',
}

export const standardNaming: { [key: string]: string } = {
	x: ServiceName.X,
	email: ServiceName.Email,
	gmail: ServiceName.Gmail,
	reddit: ServiceName.Reddit,
	trello: ServiceName.Trello,
	blogger: ServiceName.Blogger,
	yahoo_mail: ServiceName.Yahoo,
	telegram: ServiceName.Telegram,
	whatsapp: ServiceName.Whatsapp,
	facebook: ServiceName.Facebook,
	linkedin: ServiceName.Linkedin,
	custom_share: ServiceName.Custom,
	hacker_news: ServiceName.HackerNews,
};

export enum SharingMode {
	Direct = 'direct',
	Indirect = 'indirect',
}
