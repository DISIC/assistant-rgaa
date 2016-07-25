import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Sly from './Sly';



/**
 *
 */
export default function Menu({themes}) {
	return (
		<nav className="Menu">
			<button
				type="button"
				className="Button Menu-navButton Menu-navButton--prev"
			>
				&larr;
			</button>
			<div className="Menu-tabs">
				<Sly
					config={{
						horizontal: true,
						itemNav: 'basic',
						smart: true,
						activateOn: 'click',
						mouseDragging: true,
						touchDragging: true,
						releaseSwing: 1,
						nextPage: '.Menu-navButton--next',
						prevPage: '.Menu-navButton--prev',
						speed: 250,
						activeClass: 'is-active'
					}}
				>
					{themes.map(({id, title}) => (
						<li className="Menu-item" key={id}>
							<Link className="InvisibleLink Menu-link" to={`/themes/${id}`}>{title}</Link>
						</li>
					))}
				</Sly>
			</div>
			<button
				type="button"
				className="Button Menu-navButton Menu-navButton--next"
			>
				&rarr;
			</button>
		</nav>
	);
}

Menu.propTypes = {
	themes: PropTypes.array.isRequired
};
