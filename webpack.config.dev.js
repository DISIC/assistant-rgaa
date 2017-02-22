'use strict';

const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = require('./webpack.config');
const fullPath = path.resolve.bind(null, __dirname);
const webpack = require('webpack');



/**
 *
 */
config.module.preLoaders = [{
	test: /\.js$/,
	include: [
		fullPath('src')
	],
	loader: 'eslint'
}];

/**
 *
 */
config.plugins.push(
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
	}),
	new StyleLintPlugin({
		failOnError: false,
		syntax: 'scss'
	})
);



module.exports = config;
