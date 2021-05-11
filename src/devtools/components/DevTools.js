/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';



/**
 *
 */
export default createDevTools(
	<DockMonitor defaultSize={1}>
		<LogMonitor theme="tomorrow" />
	</DockMonitor>
);
