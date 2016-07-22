import React, {PropTypes} from 'react';
import {Link} from 'react-router';



/**
 *
 */
export default function Menu({themes}) {
	return (
		<nav className="Menu">
			<ul className="Menu-itemList">
				{themes.map(({id, title}) => (
					<li className="Menu-item" key={id}>
						<Link to={`/themes/${id}`}>{title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

Menu.propTypes = {
	themes: PropTypes.array.isRequired
};
