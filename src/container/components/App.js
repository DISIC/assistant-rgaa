import React, {PropTypes} from 'react';
import classNames from 'classnames';
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
export default function App({position, folded}) {
	return (
		<div
			className={classNames({
				[`${CONTAINER_ID}-wrapper`]: true,
				[`${CONTAINER_ID}-wrapper--${position}`]: true,
				[`${CONTAINER_ID}-wrapper--folded`]: folded
			})}
		>
			<ResizeHandle
				position={HandlePosition[position]}
				enabled={!folded}
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
	position: PropTypes.oneOf(['left', 'right', 'bottom']).isRequired,
	folded: PropTypes.bool.isRequired
};
