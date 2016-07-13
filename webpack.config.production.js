'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');



/**
 *
 */
config.plugins.push(
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	})
);



module.exports = config;
