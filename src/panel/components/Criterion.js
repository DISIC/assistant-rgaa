import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import classNames from 'classnames';
import TestContainer from './TestContainer';



/**
 *
 */
function Criterion({id, title, tests, isInactive, isDone, intl}) {
	const className = classNames('Criterion', {
		'is-disabled': isInactive
	});
	const htmlTitle = isInactive
		? intl.formatMessage({id: 'Theme.criterion.disabled'})
		: '';
	return (
		<div id={`criterion-${id}`} className={className} title={htmlTitle}>
			<header className="Criterion-header Title Title--sub">
				<h3
					className="Criterion-title"
					dangerouslySetInnerHTML={{
						__html: title
					}}
				/>

				<div className="Criterion-actions">
					<div className="Criterion-action">
						<input
							type="checkbox"
							title={intl.formatMessage({
								id: 'Criterion.done.label'
							})}
							checked={isDone}
							readOnly
						/>
					</div>
				</div>
			</header>

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
	isDone: PropTypes.bool,
	intl: intlShape.isRequired
};

Criterion.defaultProps = {
	isInactive: false,
	isDone: false
};

export default injectIntl(Criterion);
