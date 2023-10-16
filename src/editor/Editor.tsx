import React from 'react'
import '../common/styles/App.css'
import { ToolBar } from './toolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
function Editor() {
	return (
		<div className="App">
			<ToolBar></ToolBar>
			<WorkSpace></WorkSpace>
		</div>
	)
}

export { Editor }
