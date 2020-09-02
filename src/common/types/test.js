import {PropTypes} from 'react';



export const TestProps = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

export const TestShape = PropTypes.shape(TestProps);
