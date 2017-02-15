import React, {PropTypes} from 'react';
import {MenuItem} from 'react-aria-menubutton';



function ThemesListItem({title, icon}) {
	const style = {backgroundImage: `url('/img/${icon}')`};
	const props = {};
	const listItem = (tab) => (
		<li className="ThemesList-item" {...props}>
			{tab}
		</li>
	);

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
	icon: PropTypes.string.isRequired
};

export default ThemesListItem;
