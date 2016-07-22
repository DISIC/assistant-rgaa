import React, {PropTypes} from 'react';



/**
 *
 */
export default function DockMenu({
	popup, requestDockToBottom, requestDockToLeft, requestDockToRight, requestPopupToggle
}) {
	const handlePopupClick = () =>
		requestPopupToggle(!popup);

	return (
		<ul className="DockMenu-buttonsList">
			<button
				className="DockMenu-button"
				type="button"
				onClick={requestDockToBottom}
			>En bas</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={requestDockToLeft}
			>A gauche</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={requestDockToRight}
			>A droite</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={handlePopupClick}
			>Pop-up</button>
		</ul>
	);
}

DockMenu.propTypes = {
	popup: PropTypes.bool.isRequired,
	requestDockToBottom: PropTypes.func.isRequired,
	requestDockToLeft: PropTypes.func.isRequired,
	requestDockToRight: PropTypes.func.isRequired,
	requestPopupToggle: PropTypes.func.isRequired
};
