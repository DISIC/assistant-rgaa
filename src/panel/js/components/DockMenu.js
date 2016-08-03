import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';
import {POSITION_RIGHT, POSITION_LEFT, POSITION_BOTTOM} from '../../../common/reducers/container';



/**
 *
 */
function DockMenu({popup, position, onDockToBottom, onDockToLeft, onDockToRight, onTogglePopup}) {
	const onDropdownSelection = (callback) =>
		callback();

	const renderItem = (name, onClick, disable) => {
		const button = (
			<button
				className="DockMenu-button Button"
				type="button"
				disabled={disable}
			>
				<FormattedMessage id={`DockMenu.${name}`} />
			</button>
		);
		if (disable) {
			return button;
		}
		return (
			<MenuItem value={onClick}>
				{button}
			</MenuItem>
		);
	};

	return (
		<Wrapper onSelection={onDropdownSelection} className="DockMenu Dropdown-container">
			<Button className="Link Dropdown-toggle">
				<FormattedMessage id="DockMenu.button" />
			</Button>
			<Menu>
				<ul className="Dropdown-list Dropdown-list--right">
					<li>
						{renderItem('bottom', onDockToBottom, POSITION_BOTTOM === position)}
					</li>
					<li>
						{renderItem('left', onDockToLeft, POSITION_LEFT === position)}
					</li>
					<li>
						{renderItem('right', onDockToRight, POSITION_RIGHT === position)}
					</li>
					<li>
						{renderItem('popup', onTogglePopup, popup)}
					</li>
				</ul>
			</Menu>
		</Wrapper>
	);
}

DockMenu.propTypes = {
	popup: PropTypes.bool.isRequired,
	position: PropTypes.string.isRequired,
	onDockToBottom: PropTypes.func.isRequired,
	onDockToLeft: PropTypes.func.isRequired,
	onDockToRight: PropTypes.func.isRequired,
	onTogglePopup: PropTypes.func.isRequired
};

export default injectIntl(DockMenu);
