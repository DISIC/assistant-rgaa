'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fullPath = path.resolve.bind(null, __dirname);



/**
 *
 */
module.exports = {
	entry: {
		panel: [
			//'babel-polyfill',
			'./src/panel/index',
			'./css/panel/index.scss'
		],
		container: [
			//'babel-polyfill',
			'./src/container/index',
			'./css/container/index.scss'
		],
		helpers: [
			//'babel-polyfill',
			'./src/helpers/index',
			'./css/helpers/index.scss'
		],
		options: [
			//'babel-polyfill',
			'./src/options/index',
			'./css/options/index.scss'
		],
		background: [
			//'babel-polyfill',
			'./src/background/index'
		],
		devtools: [
			//'babel-polyfill',
			'./src/devtools/index'
		]
	},
	output: {
		path: fullPath('dist'),
		publicPath: 'dist',
		filename: '[name].js'
	},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: [
					fullPath('src')
				]
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', [
					'css?-url&sourceMap',
					'postcss',
					'sass?sourceMap'
				]),
				include: [
					fullPath('css')
				]
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	postcss: function() {
		return [
			autoprefixer({
				browsers: [
					'ie >= 8',
					'ie_mob >= 10',
					'ff >= 20',
					'chrome >= 34',
					'safari >= 7',
					'opera >= 23',
					'ios >= 7',
					'android >= 4.4',
					'bb >= 10'
				]
			})
		];
	},
	plugins: [
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js',
			minChunks: 2
		})
	]
};
