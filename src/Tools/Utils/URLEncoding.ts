const toRegular = (str: string) => {
	return (str + '==='.slice((str.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/');
};

const toSafe = (str: string) => {
	return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/** UTF-8 string → standard base64 (browser-safe, no Node Buffer) */
const utf8ToBase64 = (str: string): string => {
	const bytes = new TextEncoder().encode(str);
	let binary = '';
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
};

/** Standard base64 → UTF-8 string */
const base64ToUtf8 = (b64: string): string => {
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new TextDecoder().decode(bytes);
};

export const encode = (str: string) => {
	return toSafe(utf8ToBase64(str));
};

export const decode = (str: string) => {
	return base64ToUtf8(toRegular(str));
};
