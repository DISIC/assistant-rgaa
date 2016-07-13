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
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./js/index',
		'./css/index.scss'
	],
	output: {
		path: fullPath('dist'),
		publicPath: 'dist',
		filename: 'app.js',
	},
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: fullPath('js'),
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				include: fullPath('css'),
				loader: ExtractTextPlugin.extract('style', [
					'css?-url&sourceMap',
					'postcss',
					'sass?sourceMap'
				])
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
		new ExtractTextPlugin('app.css', {
			allChunks: true
		})
	]
};
