const path = require('path');
const { whenProd } = require('@craco/craco');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.path.json');
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
	plugins: [
		...whenProd(() => [{ plugin: require('./fontawesome.config') }], []),
		{
			plugin: require('craco-less'),
			options: { lessLoaderOptions: { lessOptions: { javascriptEnabled: true } } },
		},
		{
			plugin: sassResourcesLoader,
			options: { resources: ['./src/Assets/scss/base/export.scss'] },
		},
	],

	style: {
		postcss: { plugins: [require('autoprefixer'), require('tailwindcss')] },
	},

	//* Loading absolute paths
	webpack: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@data': path.resolve(__dirname, 'src/Data'),
			'@tools': path.resolve(__dirname, 'src/Tools'),
			'@assets': path.resolve(__dirname, 'src/Assets'),
			'@config': path.resolve(__dirname, 'src/App/Config'),
			'@components': path.resolve(__dirname, 'src/Components'),
		},
	},

	jest: {
		configure: {
			preset: 'ts-jest',
			moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
				prefix: '<rootDir>/src/',
			}),
		},
	},
};
