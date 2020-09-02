/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {PropTypes} from 'react';
import {map} from 'lodash';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import renderIf from 'render-if';
import classNames from 'classnames';
import {TestShape} from '../../common/types/test';
import TestContainer from './TestContainer';
import Icon from './Icon';



/**
 *
 */
function Criterion({
	id, level, title, tests, activeTest, isDone, isOpen, importResults, onToggle, onDone, intl
}) {
	const className = classNames('Criterion Theme-criterion', {
		'is-open': isOpen,
		'Criterion--hasActiveTest': !!activeTest
	});
	const headerClassName = classNames('Criterion-header', {
		'Title Title--sub': isOpen
	});
	const handleDoneChange = (event) =>
		onDone(event.target.checked);
	return (
		<li id={`Criterion-${id}`} className={className} data-id={id}>
			<header className={headerClassName}>
				<div className="Criterion-title" onClick={onToggle}>
					<div className="Criterion-titleText">
						<button
							className="InvisibleButton Criterion-toggle"
							type="button"
							onClick={onToggle}
							aria-expanded={isOpen}
							aria-controls={`Criterion-${id}-content`}
						>
							<span className="ScreenReaderOnly">
								<FormattedMessage
									id={`Criterion.toggle.${isOpen ? 'hide' : 'show'}`}
									values={{
										id
									}}
								/>
							</span>
						</button>

						<h3 className="Criterion-id">
							{intl.formatMessage({id: 'Criterion.title'}, {id})}

							{renderIf(!isOpen && activeTest)(() => (
								<span className="Criterion-activeTest">
									{intl.formatMessage({id: 'Criterion.activeTest'}, {id: activeTest.id})}
								</span>
							))}
						</h3>

						{renderIf(level)(() => (
							<span className="Criterion-level">
								{intl.formatMessage({id: 'Criterion.level'}, {lvl: level})}
							</span>
						))}

						<p
							className="Criterion-description"
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{__html: title}}
						/>
					</div>

					{renderIf(!isOpen && importResults)(() => (
						<div className="Criterion-importResults">
							{map(importResults, (count, status) => (
								<span
									key={status}
									className="Label ImportResult"
									data-import-result={status}
									title={intl.formatMessage({
										id: `ImportResults.${status}.title`
									}, {
										count
									})}
								>
									{count} × {status}
								</span>
							))}
						</div>
					))}
				</div>

				<div className="Criterion-actions">
					<div
						className={classNames('Criterion-action Criterion-action--done', {
							'Criterion-action--checked': isDone
						})}
					>
						<label
							htmlFor={`criterion-${id}-done-input`}
							className="Criterion-actionLabel"
							title={intl.formatMessage({
								id: isDone
									? 'Criterion.done.label'
									: 'Criterion.todo.label'
							})}
						>
							<Icon name="flag" />
						</label>
						<input
							type="checkbox"
							id={`criterion-${id}-done-input`}
							className="u-hidden"
							checked={isDone}
							onChange={handleDoneChange}
						/>
					</div>
				</div>
			</header>

			<div
				className="Criterion-content"
				id={`Criterion-${id}-content`}
			>
				{renderIf(isOpen)(() => (
					<ul className="Criterion-tests">
						{tests.map(({id: testId, title: testTitle}) => (
							<li className="Criterion-test" key={`criterion-${id}-test-${testId}`}>
								<TestContainer id={testId} title={testTitle} />
							</li>
						))}
					</ul>
				))}
			</div>
		</li>
	);
}

Criterion.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	level: PropTypes.string,
	tests: PropTypes.arrayOf(TestShape).isRequired,
	activeTest: TestShape,
	isOpen: PropTypes.bool.isRequired,
	importResults: PropTypes.objectOf(PropTypes.number),
	onToggle: PropTypes.func.isRequired,
	isDone: PropTypes.bool,
	onDone: PropTypes.func.isRequired,
	intl: intlShape.isRequired
};

Criterion.defaultProps = {
	level: undefined,
	activeTest: undefined,
	importResults: {},
	isDone: false
};

export default injectIntl(Criterion);
