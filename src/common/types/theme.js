import {PropTypes} from 'react';



export const ThemeProps = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export const ThemeShape = PropTypes.shape(ThemeProps);
