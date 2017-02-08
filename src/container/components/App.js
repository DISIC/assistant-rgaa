import React, {PropTypes} from 'react';
import {CONTAINER_ID} from '../api/iframe';
import ResizeHandle from './ResizeHandle';
import Iframe from './Iframe';



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
		<div
			id={`${CONTAINER_ID}-wrapper`}
			className={`${CONTAINER_ID}-wrapper--${position}`}
		>
			<ResizeHandle
				position={HandlePosition[position]}
				useOverlay
				foldOnClick
				handleProps={{
					title: 'Redimensionnez, ou cliquez pour afficher ou cacher l\'extension'
				}}
			>
				<Iframe />
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
