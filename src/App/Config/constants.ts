const BaseConfig = {
	BASE_URL: '/',
	SERVER: '<SERVER_ADDRESS>',
	APP_NAME: '<APP_NAME>',
	APP_SHORT_NAME: '<APP_SHORT_NAME>',
	VERSION: 0.1,
};

const LOCAL = {
	FRONT_DOMAIN: 'http://localhost:3000',
};

const DEVELOPMENT = {
	FRONT_DOMAIN: 'https://dev.mybutton.click',
};

const PRODUCTION = {
	FRONT_DOMAIN: 'https://mybutton.click',
};

//? --------------------- Config selection ----------------------------------------

export type CONFIG_TYPE = typeof BaseConfig & typeof PRODUCTION & typeof DEVELOPMENT & typeof LOCAL;

const CONFIG_BY_MODE: CONFIG_TYPE = {
	...(({ LOCAL, PRODUCTION, DEVELOPMENT } as any)[window.MODE as any] || {}),
};

export const CONFIG = { ...BaseConfig, ...CONFIG_BY_MODE };

window.CONFIG = CONFIG;
