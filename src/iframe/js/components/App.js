import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {CONTAINER_ID} from '../api/iframe';
import ResizeHandle from './ResizeHandle';
import Iframe from './Iframe';



/**
 *
 */
export default function App({position, hidden}) {
	const containerClass = classNames({
		[`${CONTAINER_ID}-container--${position}`]: true
	});
	const styles = hidden
		? {display: 'none'}
		: {display: 'block'};

	const handlePosMap = {
		right: 'left',
		left: 'right',
		bottom: 'top'
	};
	return (
		<div className={containerClass} id={`${CONTAINER_ID}-container`} style={styles}>
			<ResizeHandle
				position={handlePosMap[position]}
				useOverlay
				styles={{
					handle: {
						zIndex: 100005
					},
					overlay: {
						zIndex: 100000
					}
				}}
			>
				<Iframe />
			</ResizeHandle>
		</div>
	);
}

App.propTypes = {
	position: PropTypes.oneOf(['left', 'right', 'bottom']).isRequired,
	hidden: PropTypes.bool.isRequired
};

App.defaultProps = {
	position: 'right',
	hidden: false
};
