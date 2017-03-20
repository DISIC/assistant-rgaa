import React, {PropTypes} from 'react';
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';
import {describe, info, component} from '../../helpers/api/helpers';



/**
 *
 */
const TestHelpers = ({helpers, intl}) => (
	<div className="TestHelpers TestSection">
		<div className="TestSection-header">
			<h3 className="TestSection-title">
				<FormattedMessage id="TestHelpers.intro" />
			</h3>
		</div>

		<div className="TestSection-body">
			<ol>
				{helpers.map((helper, i) => (
					<li
						key={i}
						dangerouslySetInnerHTML={{
							__html: describe(intl, helper)
						}}
					/>
				))}
			</ol>
		</div>

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
	helpers: PropTypes.array.isRequired,
	intl: intlShape.isRequired
};



export default injectIntl(TestHelpers);
