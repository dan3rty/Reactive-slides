import React from 'react'
import './ToolBar.css'
import { TopBar } from './topBar/TopBar'
import { SettingBar } from './settingBar/SettingBar'
import { Tabs } from '../../types'

type ToolBarProps = {
	chosenTab: Tabs
}
function ToolBar(props: ToolBarProps) {
	return (
		<div className="ToolBar">
			<TopBar></TopBar>
			<SettingBar chosenTab={props.chosenTab}></SettingBar>
		</div>
	)
}

export { ToolBar }
