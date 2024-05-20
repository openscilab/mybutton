import { isDev } from '../../Tools/Utils/React';

const BaseConfig = {
	BASE_URL: '/',
	SERVER: '<SERVER_ADDRESS>',
	APP_NAME: '<APP_NAME>',
	APP_SHORT_NAME: '<APP_SHORT_NAME>',
};

const DevConfig = {
	FRONT_DOMAIN: 'https://www.dev.mybutton.click',
};

const ProdConfig = {
	FRONT_DOMAIN: 'https://www.mybutton.click',
};

export const CONFIG = { ...BaseConfig, ...(isDev ? DevConfig : ProdConfig) };
