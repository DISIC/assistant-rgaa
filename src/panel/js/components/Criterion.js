import React, {PropTypes} from 'react';
import classNames from 'classnames';
import TestContainer from './TestContainer';



/**
 *
 */
export default function Criterion({id, title, tests, currentCriterion}) {
	const containerClass = classNames('Criterion', {
	});

	return (
		<div className={containerClass}>
			<h1 className="Criterion-title">{title}</h1>

			<ul className="Criterion-tests">
				{tests.map(({id: testId, title: testTitle, instructions}) =>
					<li className="Criterion-test" key={`criterion-${id}-test-${testId}`}>
						<TestContainer
							id={testId}
							title={testTitle}
							instructions={instructions}
						/>
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
	currentCriterion: PropTypes.object.isRequired
};

Criterion.defaultProps = {
};
