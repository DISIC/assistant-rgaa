import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {partial} from 'lodash';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';



/**
 *
 */
function DockMenu({
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
						<MenuItem value={partial(requestDockToBottom, popup)}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.bottom" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={partial(requestDockToLeft, popup)}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.left" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={partial(requestDockToRight, popup)}>
							<button
								className="DockMenu-button Button"
								type="button"
							>
								<FormattedMessage id="DockMenu.right" />
							</button>
						</MenuItem>
					</li>
					<li>
						<MenuItem value={popupToggle}>
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
	requestDockToBottom: PropTypes.func.isRequired,
	requestDockToLeft: PropTypes.func.isRequired,
	requestDockToRight: PropTypes.func.isRequired,
	requestPopupToggle: PropTypes.func.isRequired
};

export default injectIntl(DockMenu);
