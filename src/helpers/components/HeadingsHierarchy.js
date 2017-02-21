import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import renderIf from 'render-if';



/**
 *
 */
const HeadingsHierarchy = ({items}) => (
	<div className="HeadingsHierarchy Widget">
		<h4 className="HeadingsHierarchy-title">
			<FormattedMessage id="HeadingsHierarchy.title" />
		</h4>

		{renderIf(items.length)(() =>
			<ul className="HeadingsHierarchy-list">
				{items.map(({level, text, fake}, i) =>
					<li
						className={classNames('HeadingsHierarchy-item', {
							[`HeadingsHierarchy-item--level-${level}`]: true,
							'HeadingsHierarchy-item--fake': fake
						})}
						key={i}
					>
						<span className="Label HeadingsHierarchy-level">{level}</span>
						<span className="HeadingsHierarchy-text">{text}</span>
					</li>
				)}
			</ul>
		)}
		{renderIf(!items.length)(() =>
			<p>
				<FormattedMessage id="HeadingsHierarchy.noItems" />
			</p>
		)}
	</div>
);

HeadingsHierarchy.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		level: PropTypes.number,
		text: PropTypes.string,
		fake: PropTypes.bool
	}))
};

export default HeadingsHierarchy;
