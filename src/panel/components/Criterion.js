import React, {PropTypes} from 'react';
import TestContainer from './TestContainer';



/**
 *
 */
export default function Criterion({id, title, tests}) {
	return (
		<div id={`criterion-${id}`} className="Criterion">
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
	tests: PropTypes.array.isRequired
};

Criterion.defaultProps = {
};
