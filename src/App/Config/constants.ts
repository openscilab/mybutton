import { isDev } from '../../Tools/Utils/React';

const BaseConfig = {
	BASE_URL: '/',
	SERVER: '<SERVER_ADDRESS>',
	APP_NAME: '<APP_NAME>',
	APP_SHORT_NAME: '<APP_SHORT_NAME>',

	//* Parse
	Parse: {
		appId: '<appID>',
		//exp: 'myAppId',

		serverURL: '<serverURL>',
		//exp: 'https://back.test.com/parse'

		liveQueryServerURL: '<liveQueryServerURL>',
		//exp: 'wss://back.test.com'
	},
};

const DevConfig = {
	// SERVER: 'http://127.0.0.1:1337',
	// API_SERVER: `${BaseConfig.SERVER}/api`,
	// API_SERVER: 'http://127.0.0.1:1337/api',
};

const ProdConfig = {
	API_SERVER: `${BaseConfig.SERVER}/api`,
};

export const CONFIG = { ...BaseConfig, ...(isDev ? DevConfig : ProdConfig) };
