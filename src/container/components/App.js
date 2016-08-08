import React, {PropTypes} from 'react';
import renderIf from 'render-if';
import {CONTAINER_ID} from '../api/iframe';
import ResizeHandle from './ResizeHandle';
import Iframe from './Iframe';
import ImportModalContainer from './ImportModalContainer';



/**
 *
 */
export default function App({open, position}) {
	const handlePosMap = {
		right: 'left',
		left: 'right',
		bottom: 'top'
	};

	return renderIf(open)(() => (
		<div
			id={`${CONTAINER_ID}-wrapper`}
			className={`${CONTAINER_ID}-wrapper--${position}`}
		>
			<ResizeHandle
				position={handlePosMap[position]}
				useOverlay
				foldOnClick
				handleProps={{
					title: 'Redimensionnez, ou cliquez pour afficher ou cacher l\'extension'
				}}
			>
				<Iframe />
			</ResizeHandle>

			<ImportModalContainer />
		</div>
	));
}

App.propTypes = {
	open: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(['left', 'right', 'bottom']).isRequired
};

App.defaultProps = {
	open: false,
	position: 'right'
};
