import {each, isArray, includes, join, uniq, map} from 'lodash';
import Papa from 'papaparse';
import {getReference} from '../../common/api/reference';



/**
 * schema of one row we expect from an import file
 */
const csvRowSchema = {
	'Version référentiel': {required: true},
	'Ref-audit': {},
	Auditeur: {},
	Url: {required: true},
	Thématique: {},
	Critère: {required: true},
	Niveau: {required: true},
	Test: {required: true},
	Statut: {required: true, oneOf: ['C', 'NC', 'NA', 'NT']},
	Dérogé: {oneOf: ['D']},
	Remarques: {},
	'Note dérogation': {}
};

/**
 *
 */
const rowErrors = (row, schema) => {
	const errors = [];
	each(schema, ({required, oneOf}, key) => {
		const value = row[key];
		if (required && !value) {
			errors.push({
				code: 'MissingRequiredField',
				message: `le champ "${key}" est obligatoire`
			});
		}
		if (
			((!required && value) || required) &&
			isArray(oneOf) && !includes(oneOf, value)
		) {
			errors.push({
				code: 'UnallowedValue',
				message:
					`le champ "${key}" a pour valeur "${value}" mais les valeurs acceptées sont ` +
					`${join(oneOf.map(val => `"${val}"`), ', ')}`
			});
		}
	});
	return errors;
};

/**
 *
 */
const formattedErrorMessage = ({code, message}) => {
	switch (code) {
		case 'TooManyFields':
		case 'TooFewFields':
			return message.replace(
				/Too (?:many|few) fields: expected (\d+) fields but parsed (\d+)/,
				'$2 champs trouvés sur les $1 décrits en entête du fichier'
			);
		case 'UndetectableDelimiter':
			return message.replace(
				/Unable to auto-detect delimiting character; defaulted to '(.*)'/,
				'impossible de détecter automatiquement le délimiteur ; utilisation de $1'
			);
		case 'MissingQuotes':
			return 'guillemets non fermés';
		default:
			return message;
	}
};

/**
 *
 */
const formattedError = ({code, message, row}) => ({
	code,
	message: formattedErrorMessage({code, message}),
	// we want to show the *real* csv file linenumber
	// but in the parsed content, the header row is removed,
	// and we start index at 0, so we are two actual rows short
	row: row + 2
});

/**
 *
 */
const parsedCsv = (csvString) => {
	const csv = Papa.parse(csvString, {header: true});
	let errors = csv.errors;
	csv.data.forEach((row, n) => {
		let currentRowErrors = rowErrors(row, csvRowSchema);
		if (currentRowErrors.length) {
			// put row index info in each error object
			currentRowErrors = currentRowErrors.map(error => ({
				...error,
				row: n
			}));

			errors = [...errors, ...currentRowErrors];
		}
	});

	return {
		data: csv.data,
		errors: errors.length
			? errors.map(formattedError)
			: []
	};
};

/**
 *
 */
const checkCsvReferenceVersion = (rows) => {
	const versions = uniq(map(rows, 'Version référentiel'));
	const version = versions[0];

	return new Promise((resolve, reject) => {
		if (versions.length > 1) {
			reject(
				'plusieurs versions de référentiels trouvées dans le fichier au lieu d\'une : ' +
				`${join(versions.map(val => `"${val}"`), ', ')}`
			);
		}

		getReference(version)
			.then(() => resolve(version))
			.catch(() =>
				reject(`version de référentiel "${version}" non supportée par l\'extension`)
			);
	});
};

/**
 *
 */
export const getCsv = (csvString) => {
	const csv = parsedCsv(csvString);

	return checkCsvReferenceVersion(csv.data)
		.then(() => csv)
		.catch(reason => ({
			data: csv.data,
			errors: [
				{
					row: null,
					code: 'InvalidReference',
					message: reason
				},
				...csv.errors
			]
		}));
};
