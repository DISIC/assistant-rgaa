import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {MenuItem} from 'react-aria-menubutton';



function ThemesListItem({title, icon, isDisabled, intl}) {
	const style = {backgroundImage: `url('/img/${icon}')`};
	const props = {};
	const listItem = (tab) => (
		<li className="ThemesList-item" {...props}>
			{tab}
		</li>
	);

	// do not allow to click on item if it is disabled
	if (isDisabled) {
		return listItem(
			<span
				className="ThemesList-link is-disabled"
				style={style}
				title={intl.formatMessage({
					id: 'Theme.disabled'
				})}
			>
				{title}
			</span>
		);
	}

	return listItem(
		<MenuItem
			tag="a"
			className="InvisibleLink ThemesList-link"
			href={`#${title}`}
			value={`#${title}`}
			style={style}
		>
			{title}
		</MenuItem>
	);
}

ThemesListItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	intl: intlShape.isRequired
};

ThemesListItem.defaultProps = {
	isDisabled: false
};

export default injectIntl(ThemesListItem);
