import React, {PropTypes} from 'react';
import {CONTAINER_ID} from '../api/container';
import ResizeHandle from './ResizeHandle';
import PanelIframe from './PanelIframe';



/**
 *
 */
const HandlePosition = {
	right: 'left',
	left: 'right',
	bottom: 'top'
};

/**
 *
 */
export default function App({position}) {
	return (
		<div className={`${CONTAINER_ID}-wrapper ${CONTAINER_ID}-wrapper--${position}`}>
			<ResizeHandle
				position={HandlePosition[position]}
				useOverlay
				handleProps={{
					title: 'Redimensionner le panneau'
				}}
			>
				<PanelIframe />
			</ResizeHandle>
		</div>
	);
}

App.propTypes = {
	position: PropTypes.oneOf(['left', 'right', 'bottom']).isRequired
};

App.defaultProps = {
	position: 'right'
};
