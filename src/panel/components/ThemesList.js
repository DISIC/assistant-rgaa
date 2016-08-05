import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Sly from './Sly';



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
export default function ThemesList({themes, activeTheme}) {
	const renderItems = (items) =>
		items.map(({id, title}) => {
			const className = classNames('ThemesList-item', {
				'is-active': activeTheme.id === id
			});
			return (
				<li className={className} key={id}>
					<Link
						className="InvisibleLink ThemesList-link"
						to={`/themes/${id}`}
						style={{
							backgroundImage: `url('/img/${icons[id]}')`
						}}
					>
						{title}
					</Link>
				</li>
			);
		});

	return (
		<nav className="ThemesList">
			<button
				type="button"
				className="Button ThemesList-navButton ThemesList-navButton--prev"
			>
				&larr;
			</button>
			<div className="ThemesList-tabs">
				<Sly
					config={{
						horizontal: true,
						itemNav: 'basic',
						smart: true,
						activateOn: 'click',
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
					{renderItems(themes)}
				</Sly>
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
	activeTheme: PropTypes.object
};
