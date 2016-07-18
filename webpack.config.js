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
			'./panel/js/index',
			'./panel/css/index.scss'
		],
		content: [
			'babel-polyfill',
			'./content/js/index',
			'./content/css/index.scss'
		],
		background: [
			'babel-polyfill',
			'./background/index'
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
					fullPath('panel/js'),
					fullPath('content/js'),
					fullPath('common'),
					fullPath('background')
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
					fullPath('panel/css'),
					fullPath('content/css')
				]
			},
			{
				test: /\.json$/,
				loader: 'json',
				include: [
					fullPath('data/helpers'),
					fullPath('data/references')
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
		})
	]
};
