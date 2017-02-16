import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {describe, component} from '../../helpers/api/helpers';



/**
 *
 */
const TestHelpers = ({helpers}) => (
	<div className="TestHelpers">
		<p><FormattedMessage id="TestHelpers.intro" /></p>

		<ol>
			{helpers.map((helper, i) => (
				<li
					key={i}
					dangerouslySetInnerHTML={{
						__html: describe(helper)
					}}
				/>
			))}
		</ol>

		{helpers
			.map(component)
			.filter((Component) =>
				!!Component
			)
			.map((Component, i) =>
				<Component key={i} />
			)
		}
	</div>
);

TestHelpers.propTypes = {
	helpers: PropTypes.array.isRequired
};



export default TestHelpers;
