import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {describe} from '../../helpers/api';



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
	</div>
);

TestHelpers.propTypes = {
	helpers: PropTypes.array.isRequired
};



export default TestHelpers;
