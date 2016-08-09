import Ajv from 'ajv';
import schema from '../../../data/imports/schema';
import {getReference} from '../../common/api/reference';



export const validateImportContent = (content) => {
	const reference = getReference(getReferenceVersion(content));
	if (!reference) {
		throw new Error('The RGAA version used in the imported file isn\'t supported.');
	}
	return validateJson(content);
};

/**
 * return true for given json object/string matching our schema
 * throw error if not
 */
export const validateJson = (jsonObject) => {
	const ajv = new Ajv({jsonPointers: true, allErrors: true});
	const isValid = ajv.validate(schema, jsonObject);
	if (!isValid) {
		throw new Error(ajv.errorsText(ajv.errors, {separator: '\n'}));
	}

	return true;
};

export const getReferenceVersion = (importContent) =>
	importContent['version-referentiel'] || null;
