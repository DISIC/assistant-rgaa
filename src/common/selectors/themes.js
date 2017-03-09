import {get} from 'lodash';



/**
 *
 */
export const isMenuOpen = (state) =>
	!!get(state, 'themes.menuIsOpen');
