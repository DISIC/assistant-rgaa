import React, {PropTypes} from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';
import {Position} from '../../common/api/panel';
import Icon from './Icon';



/**
 *
 */
const DockMenuItem = ({position, currentPosition, onSelect}) => {
	const disabled = (position === currentPosition);
	const handleClick = () => {
		if (!disabled) {
			onSelect(position);
		}
	};

	return (
		<MenuItem value={handleClick}>
			<button
				className="DockMenu-button Button"
				type="button"
				disabled={disabled}
			>
				<FormattedMessage id={`DockMenu.${position}`} />
			</button>
		</MenuItem>
	);
};

DockMenuItem.propTypes = {
	position: PropTypes.string.isRequired,
	currentPosition: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};



/**
 *
 */
function DockMenu({position, onPositionChange, intl}) {
	const onDropdownSelection = (callback) =>
		callback();

	return (
		<Wrapper onSelection={onDropdownSelection} className="DockMenu Dropdown-container">
			<Button
				className="Link Dropdown-toggle"
				title={intl.formatMessage({id: 'DockMenu.button'})}
			>
				<Icon
					name="window-restore"
					title={intl.formatMessage({id: 'DockMenu.button'})}
				/>
			</Button>

			<Menu>
				<ul className="Dropdown-list Dropdown-list--right">
					<li>
						<DockMenuItem
							position={Position.bottom}
							currentPosition={position}
							onSelect={onPositionChange}
						/>
					</li>
					<li>
						<DockMenuItem
							position={Position.left}
							currentPosition={position}
							onSelect={onPositionChange}
						/>
					</li>
					<li>
						<DockMenuItem
							position={Position.right}
							currentPosition={position}
							onSelect={onPositionChange}
						/>
					</li>
					<li>
						<DockMenuItem
							position={Position.popup}
							currentPosition={position}
							onSelect={onPositionChange}
						/>
					</li>
				</ul>
			</Menu>
		</Wrapper>
	);
}

DockMenu.propTypes = {
	position: PropTypes.string.isRequired,
	onPositionChange: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};

export default injectIntl(DockMenu);
