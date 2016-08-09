import Ajv from 'ajv';
import {isString} from 'lodash';
import schema from '../../../data/imports/schema';



/**
 * return true for given json object/string matching our schema
 * throw error if not
 */
export const validateJson = (content) => {
	let toTest = content;
	if (isString(content)) {
		toTest = JSON.parse(content);
	}

	const ajv = new Ajv({jsonPointers: true, allErrors: true});
	const isValid = ajv.validate(schema, toTest);
	if (!isValid) {
		throw new Error(ajv.errorsText(ajv.errors, {separator: '\n'}));
	}

	return true;
};
