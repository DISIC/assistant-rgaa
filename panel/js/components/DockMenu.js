import React, {PropTypes} from 'react';



/**
 *
 */
export default function DockMenu({onBottomClick, onLeftClick, onRightClick, onExternalClick}) {
	return (
		<ul className="DockMenu-buttonsList">
			<button
				className="DockMenu-button"
				type="button"
				onClick={onBottomClick}
			>En bas</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={onLeftClick}
			>A gauche</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={onRightClick}
			>A droite</button>
			<button
				className="DockMenu-button"
				type="button"
				onClick={onExternalClick}
			>Pop-up</button>
		</ul>
	);
}
