import {get} from 'lodash';



/**
 *
 */
export const isMenuOpen = (state) =>
	!!get(state, 'themes.menuIsOpen');

/**
 *
 */
export const getScrollPosition = (state) =>
	get(state, 'themes.scrollPosition', 0);
