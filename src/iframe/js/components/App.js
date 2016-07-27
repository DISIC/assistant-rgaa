import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {CONTAINER_ID} from '../api/iframe';
import Iframe from './Iframe';



/**
 *
 */
export default function App({position = 'right', hidden = false}) {
	const containerClass = classNames({
		[`${CONTAINER_ID}-container--${position}`]: true
	});
	const styles = hidden
		? {display: 'none'}
		: {display: 'block'};

	return (
		<div className={containerClass} id={`${CONTAINER_ID}-container`} style={styles}>
			<Iframe />
		</div>
	);
}

App.propTypes = {
	position: PropTypes.string,
	hidden: PropTypes.bool
};
