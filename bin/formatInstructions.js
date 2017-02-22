const utils = require('./utils');
const _ = require('lodash');



const formatToType = (data, type) =>
	_.mapValues(data, (instruction) => ({
		[type]: instruction
	}));

const format = (options) => {
	const data = utils.readJson(options.source);
	const formatted = formatToType(data, 'rgaa');
	return utils.writeJsonTo(options.dest, false)(formatted);
};

module.exports = format;
