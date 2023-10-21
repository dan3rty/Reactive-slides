import React from 'react'
import '../common/styles/App.css'
import { ToolBar } from './toolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { Tabs } from '../types'
function Editor() {
	const chosenTab = Tabs.EDIT
	return (
		<div className="App">
			<ToolBar chosenTab={chosenTab}></ToolBar>
			<WorkSpace chosenTab={chosenTab}></WorkSpace>
		</div>
	)
}

export { Editor }
