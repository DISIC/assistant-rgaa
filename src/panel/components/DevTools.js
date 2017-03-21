import React, {PropTypes} from 'react';



/**
 *
 */
const DevTools = ({onSearchCriterion, onReloadReference}) => (
	<div
		className="DevTools"
		style={{
			display: 'flex'
		}}
	>
		<input
			placeholder="critère"
			type="search"
			onChange={(event) =>
				onSearchCriterion(event.target.value)
			}
			style={{
				flex: '1'
			}}
		/>

		<button type="button" onClick={onReloadReference}>
			Recharger le référentiel
		</button>
	</div>
);

DevTools.propTypes = {
	onSearchCriterion: PropTypes.func,
	onReloadReference: PropTypes.func
};

export default DevTools;
