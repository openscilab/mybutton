import crypto from 'crypto';

export const capitalize = (str: string) =>
	`${str?.charAt?.(0)?.toUpperCase?.()}${str?.slice?.(1)?.toLowerCase?.()}`;

export const lowercaseFirst = (str: string) => `${str?.charAt?.(0)?.toLowerCase?.()}${str?.slice?.(1)}`;

export const uppercaseWords = (str: string): string =>
	str
		?.toLowerCase()
		?.split('_')
		?.map((i: string) => capitalize(i))
		?.join(' ');

export const camelCase = (str: string) =>
	str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

export const slugify = (str: string): string =>
	str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');

export const isContain = (string: string, searchValue: string) => {
	const lowerStr = string?.toLocaleLowerCase?.()?.trim();
	const lowerSearchValue = searchValue?.toLocaleLowerCase?.()?.trim();
	return lowerStr?.includes(lowerSearchValue);
};

export const isEmail = (str: string) =>
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
		str
	);

export const jwtDecode = (token: string): { exp?: number; iat?: number } => {
	if (token === '') return {};
	return JSON.parse(
		decodeURIComponent(
			atob(token.split('.')[1]?.replace('-', '+')?.replace('_', '/'))
				.split('')
				.map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
				.join('')
		)
	);
};

export const generateRandomString = (length: number) => {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';
	return Array(length)
		.fill('')
		.map(_ => {
			const set = Math.random() < 0.5 ? chars : numbers;
			return set[~~(Math.random() * set.length)];
		})
		.join('');
};

export const generateRandomNumber = (length: number) =>
	[...Array(length)]?.map(_ => `${~~(Math.random() * 10)}`)?.join('');

export const awsIdGenerator = () => [8, 4, 4, 4, 12].map(length => generateRandomString(length)).join('-');

export const uid = () => generateRandomString(~~Math.random() * 10 + 3);

export const createHashId = (str: string) => crypto.createHash('sha256').update(str).digest('base64');

export const urlHashes = (hash?: string) => hash?.split('#')?.slice(1) || [];

export const getEmployeeFullName = (o: { lastName?: string; middleName?: string; firstName?: string }) =>
	[o?.lastName, o?.middleName, o?.firstName]?.filter(x => !!x)?.join(' ');

export const emailRegex =
	/^((([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))?$/i;

export const isUpperCase = (str: string) => /^[A-Z]*$/.test(str);

export const numFormatter = (num: number) => num?.toLocaleString('en', { minimumFractionDigits: 2 });

export const userNameAbbreviation = (str: string) => {
	if (!str) return '';
	const parts = str?.split(' ');
	if (parts.length === 1) return str.slice(0, 2)?.toUpperCase();
	else {
		const first = parts[0].slice(0, 1);
		const last = parts[parts.length - 1].slice(0, 1);
		return `${first}${last}`;
	}
};
