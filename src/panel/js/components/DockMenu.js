import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';



/**
 *
 */
function DockMenu({popup, onDockToBottom, onDockToLeft, onDockToRight, onTogglePopup}) {
	const onDropdownSelection = (callback) =>
		callback();

	return (
		<Wrapper onSelection={onDropdownSelection} className="DockMenu Dropdown-container">
			<Button className="Link Dropdown-toggle">Dock</Button>
			<Menu>
				<ul className="Dropdown-list Dropdown-list--right">
					<li>
						<MenuItem value={onDockToBottom}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.bottom" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={onDockToLeft}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.left" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={onDockToRight}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.right" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={onTogglePopup}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage
									id={`DockMenu.popup.${popup
										? 'close'
										: 'open'}`
									}
								/>
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
	onDockToBottom: PropTypes.func.isRequired,
	onDockToLeft: PropTypes.func.isRequired,
	onDockToRight: PropTypes.func.isRequired,
	onTogglePopup: PropTypes.func.isRequired
};

export default injectIntl(DockMenu);
