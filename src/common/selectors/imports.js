import {property, get} from 'lodash';



/**
 *
 */
export const isModalOpen = property('imports.modal.open');

/**
 *
 */
export const getErrors = property('imports.errors');

/**
 *
 */
export const getContent = property('imports.content');

/**
 *
 */
export const getVersion = (state) =>
	get(state.imports, 'content.version-referentiel', null);

/**
 * check if the current import is valid
 *
 * returns null is there is no current import / bool otherwise
 */
export const isValid = (state) =>
	state.imports.content === null && state.imports.errors === ''
		? null
		: state.imports.content !== null && state.imports.errors === '';
