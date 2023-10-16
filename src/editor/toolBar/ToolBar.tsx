import React from 'react'
import './ToolBar.css'
import { TopBar } from './topBar/TopBar'
import { SettingBar } from './settingBar/SettingBar'
function ToolBar() {
	return (
		<div className="ToolBar">
			<TopBar></TopBar>
			<SettingBar></SettingBar>
		</div>
	)
}

export { ToolBar }
