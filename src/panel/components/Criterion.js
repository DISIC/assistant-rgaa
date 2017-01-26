import React, {PropTypes} from 'react';
import {injectIntl, intlShape} from 'react-intl';
import renderIf from 'render-if';
import classNames from 'classnames';
import TestContainer from './TestContainer';



/**
 *
 */
function Criterion({id, title, tests, isInactive, isDone, isOpen, onToggle, intl}) {
	const className = classNames('Criterion Theme-criterion', {
		'is-disabled': isInactive,
		'is-open': isOpen
	});
	const headerClassName = classNames('Criterion-header', {
		'Title Title--sub': isOpen
	});
	const htmlTitle = isInactive
		? intl.formatMessage({id: 'Theme.criterion.disabled'})
		: '';
	return (
		<li id={`criterion-${id}`} className={className} title={htmlTitle}>
			<header className={headerClassName}>
				<h3 className="Criterion-title">
					<button
						className="InvisibleButton Criterion-toggle"
						type="button"
						onClick={onToggle}
					>
						<span dangerouslySetInnerHTML={{__html: title}} />
					</button>
				</h3>

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

			<div className="Criterion-content">
				{renderIf(isOpen)(() =>
					<ul className="Criterion-tests">
						{tests.map(({id: testId, title: testTitle}) =>
							<li className="Criterion-test" key={`criterion-${id}-test-${testId}`}>
								<TestContainer id={testId} title={testTitle} />
							</li>
						)}
					</ul>
				)}
			</div>
		</li>
	);
}

Criterion.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	tests: PropTypes.array.isRequired,
	isInactive: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	isDone: PropTypes.bool,
	intl: intlShape.isRequired
};

Criterion.defaultProps = {
	isInactive: false,
	isDone: false
};

export default injectIntl(Criterion);
