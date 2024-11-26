const toRegular = (str: string) => {
	return (str + '==='.slice((str.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/');
};

const toSafe = (str: string) => {
	return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const encode = (str: string) => {
	return toSafe(Buffer.from(str).toString('base64'));
};

export const decode = (str: string) => {
	return Buffer.from(toRegular(str), 'base64').toString('utf8');
};
