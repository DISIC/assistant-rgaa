import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {describe, info, component} from '../../helpers/api/helpers';



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
			.map((config, i) => {
				const {args} = info(config);
				const Helper = component(config);

				return Helper
					? <Helper key={i} args={args} />
					: null;
			})
			.filter((helper) =>
				!!helper
			)
		}
	</div>
);

TestHelpers.propTypes = {
	helpers: PropTypes.array.isRequired
};



export default TestHelpers;
