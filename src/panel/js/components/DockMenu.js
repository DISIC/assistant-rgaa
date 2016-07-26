import React, {PropTypes} from 'react';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';



/**
 *
 */
export default function DockMenu({
	popup,
	requestDockToBottom, requestDockToLeft, requestDockToRight, requestPopupToggle
}) {
	const popupToggle = () =>
		requestPopupToggle(!popup);

	const onDropdownSelection = (callback) =>
		callback();

	return (
		<Wrapper onSelection={onDropdownSelection} className="DockMenu Dropdown-container">
			<Button className="Link Dropdown-toggle">Dock</Button>
			<Menu>
				<ul className="Dropdown-list Dropdown-list--right">
					<li>
						<MenuItem value={requestDockToBottom}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								En bas
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={requestDockToLeft}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								A gauche
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={requestDockToRight}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								A droite
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={popupToggle}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								Pop-up
							</button>
						</MenuItem>
					</li>
				</ul>
			</Menu>
		</Wrapper>
	);
}

DockMenu.propTypes = {
	popup: PropTypes.bool.isRequired,
	requestDockToBottom: PropTypes.func.isRequired,
	requestDockToLeft: PropTypes.func.isRequired,
	requestDockToRight: PropTypes.func.isRequired,
	requestPopupToggle: PropTypes.func.isRequired
};
