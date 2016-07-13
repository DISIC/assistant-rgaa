const path = require('path');
const fullPath = path.resolve.bind(null, __dirname);



/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
			'test/**/*.js'
		],
		frameworks: [
			'mocha',
			'chai'
		],
		reporters: [
			'mocha'
		],
		browsers: [
			'Chrome',
			'Firefox'
		],
		preprocessors: {
			'js/**/*.js': ['webpack'],
			'test/**/*.js': ['webpack']
		},
		webpack: {
			devtool: 'inline-source-map',
			resolve: {
				alias: {
					'rgaa-toolbar': fullPath('js')
				}
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						include: [
							fullPath('js'),
							fullPath('test')
						],
						loader: 'babel'
					},
					{
						// @see lelandrichardson/enzyme-example-karma-webpack
						test: /\.json$/,
						loader: 'json'
					}
				]
			},
			externals: {
				// @see lelandrichardson/enzyme-example-karma-webpack
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': true
			}
		},
		webpackMiddleware: {
			noInfo: true
		}
	});
};
