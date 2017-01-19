import React, {PropTypes} from 'react';
import {map, includes} from 'lodash';
import Slyct from './Slyct';
import ThemesListItem from './ThemesListItem';



const icons = {
	1: 'image.png',
	2: 'application-sidebar.png',
	3: 'color.png',
	4: 'film.png',
	5: 'table.png',
	6: 'link.png',
	7: 'script-text.png',
	8: 'navigation-090.png',
	9: 'newspaper.png',
	10: 'wand.png',
	11: 'ui-toolbar.png',
	12: 'arrow-split.png',
	13: 'book-brown.png'
};

/**
 *
 */
export default function ThemesList({themes, activeTheme, inactiveThemes}) {
	return (
		<nav className="ThemesList">
			<button
				type="button"
				className="Button ThemesList-navButton ThemesList-navButton--prev"
			>
				&larr;
			</button>
			<div className="ThemesList-tabs">
				<Slyct
					config={{
						horizontal: true,
						itemNav: 'basic',
						smart: true,
						activateOn: null,
						mouseDragging: true,
						touchDragging: true,
						releaseSwing: 1,
						nextPage: '.ThemesList-navButton--next',
						prevPage: '.ThemesList-navButton--prev',
						speed: 250,
						activeClass: 'is-active',
						keyboardNavBy: 'items'
					}}
					rawData={themes}
				>
					{map(themes, (theme) =>
						<ThemesListItem
							{...theme}
							icon={icons[theme.id]}
							isActive={activeTheme === theme.id}
							isDisabled={includes(inactiveThemes, theme.id)}
							key={theme.id}
						/>
					)}
				</Slyct>
			</div>
			<button
				type="button"
				className="Button ThemesList-navButton ThemesList-navButton--next"
			>
				&rarr;
			</button>
		</nav>
	);
}

ThemesList.propTypes = {
	themes: PropTypes.array.isRequired,
	activeTheme: PropTypes.string,
	inactiveThemes: PropTypes.array
};

ThemesList.defaultProps = {
	activeTheme: {
		id: null
	},
	inactiveThemes: []
};
