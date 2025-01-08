const BaseConfig = {
	APP_NAME: 'MyButton',
	APP_SHORT_NAME: 'MyBTN',
	VERSION: 0.5,
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
