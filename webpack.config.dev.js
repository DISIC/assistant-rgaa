'use strict';

const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = require('./webpack.config');
const fullPath = path.resolve.bind(null, __dirname);



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
	new StyleLintPlugin({
		failOnError: false
	})
);



module.exports = config;
