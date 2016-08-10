import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import {Link} from 'react-router';
import {includes} from 'lodash';
import classNames from 'classnames';
import Slyct from './Slyct';



const icons = {
	1: 'image.png',
	2: 'application-sidebar.png',
	3: 'color.png',
	4: 'film.png',
	5: 'table.png',
	6: 'link.png',
	7: 'script-text.png',
	9: 'newspaper.png',
	10: 'wand.png',
	11: 'ui-toolbar.png',
	12: 'arrow-split.png'
};

/**
 *
 */
function ThemesList({themes, activeTheme, inactiveThemes, intl}) {
	const renderTab = ({id, title}) => {
		const isActive = activeTheme.id === id;
		const isDisabled = includes(inactiveThemes, id);
		const tabStyles = {backgroundImage: `url('/img/${icons[id]}')`};
		const props = {};
		if (isActive) {
			// this lets Slyct to be a "controlled" component
			props['data-slyct-active-item'] = '';
		}
		const listItem = (tab) => (
			<li className="ThemesList-item" key={id} {...props}>
				{tab}
			</li>
		);
		// do not allow to click on item if it is disabled
		if (isDisabled) {
			return listItem(
				<span
					className="ThemesList-link is-disabled"
					style={tabStyles}
					title={intl.formatMessage({
						id: 'Theme.disabled'
					})}
				>
					{title}
				</span>
			);
		}
		return listItem(
			<Link
				className="InvisibleLink ThemesList-link"
				to={`/themes/${id}`}
				style={tabStyles}
			>
				{title}
			</Link>
		);
	};

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
					{themes.map(renderTab)}
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
	activeTheme: PropTypes.object,
	inactiveThemes: PropTypes.array,
	intl: intlShape.isRequired
};

ThemesList.defaultProps = {
	activeTheme: {},
	inactiveThemes: []
};

export default injectIntl(ThemesList);
