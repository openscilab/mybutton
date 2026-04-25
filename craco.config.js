const path = require('path');
const fs = require('fs');
const sassResourcesLoader = require('craco-sass-resources-loader');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const paths = require('react-scripts/config/paths');

module.exports = {
	devServer: (devServerConfig) => {
		delete devServerConfig.onBeforeSetupMiddleware;
		delete devServerConfig.onAfterSetupMiddleware;

		devServerConfig.setupMiddlewares = (middlewares, devServer) => {
			if (!devServer) {
				throw new Error('webpack-dev-server is not defined');
			}
			middlewares.push(evalSourceMapMiddleware(devServer));
			if (fs.existsSync(paths.proxySetup)) {
				require(paths.proxySetup)(devServer.app);
			}
			middlewares.push(
				redirectServedPath(paths.publicUrlOrPath),
				noopServiceWorkerMiddleware(paths.publicUrlOrPath)
			);
			return middlewares;
		};
		return devServerConfig;
	},
	plugins: [
		{
			plugin: sassResourcesLoader,
			options: { resources: ['./src/Assets/scss/base/export.scss'] },
		},
	],

	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@data': path.resolve(__dirname, 'src/Data'),
			'@tools': path.resolve(__dirname, 'src/Tools'),
			'@assets': path.resolve(__dirname, 'src/Assets'),
			'@config': path.resolve(__dirname, 'src/App/Config'),
			'@components': path.resolve(__dirname, 'src/Components'),
		},
		configure: (webpackConfig) => {
			webpackConfig.module.rules.push({
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			});
			return webpackConfig;
		},
	},

	style: {
		sass: {
			loaderOptions: {
				sassOptions: {
					silenceDeprecations: ['legacy-js-api', 'import'],
				},
			},
		},
	},
};
