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
			'babel-polyfill',
			'./src/panel/js/index',
			'./src/panel/css/index.scss'
		],
		iframe: [
			'babel-polyfill',
			'./src/iframe/js/index',
			'./src/iframe/css/index.scss'
		],
		helpers: [
			'babel-polyfill',
			'./src/helpers/js/index',
			'./src/helpers/css/index.scss'
		],
		background: [
			'babel-polyfill',
			'./src/background/index'
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
					fullPath('src')
				]
			},
			{
				test: /\.json$/,
				loader: 'json',
				include: [
					fullPath('data')
				]
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
		new webpack.optimize.CommonsChunkPlugin('common.js')
	]
};
