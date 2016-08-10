import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import TestContainer from './TestContainer';



/**
 *
 */
function Criterion({id, title, tests, isInactive, intl}) {
	const className = classNames('Criterion', {
		'is-disabled': isInactive
	});
	const htmlTitle = isInactive
		? intl.formatMessage({id: 'Theme.criterion.disabled'})
		: '';
	return (
		<div id={`criterion-${id}`} className={className} title={htmlTitle}>
			<h1
				className="Criterion-title"
				dangerouslySetInnerHTML={{
					__html: title
				}}
			/>

			<ul className="Criterion-tests">
				{tests.map(({id: testId, title: testTitle}) =>
					<li className="Criterion-test" key={`criterion-${id}-test-${testId}`}>
						<TestContainer id={testId} title={testTitle} />
					</li>
				)}
			</ul>
		</div>
	);
}

Criterion.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	tests: PropTypes.array.isRequired,
	isInactive: PropTypes.bool,
	intl: intlShape.isRequired
};

Criterion.defaultProps = {
	isInactive: false
};

export default injectIntl(Criterion);
