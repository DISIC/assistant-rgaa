import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {Link} from 'react-router';



function ThemesListItem({id, title, icon, isDisabled, intl}) {
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
		<a
			className="InvisibleLink ThemesList-link"
			href={`#${title}`}
			style={style}
		>
			{title}
		</a>
	);
}

ThemesListItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	isDisabled: PropTypes.bool,
	intl: intlShape.isRequired
};

ThemesListItem.defaultProps = {
	isActive: false,
	isDisabled: false
};

export default injectIntl(ThemesListItem);
