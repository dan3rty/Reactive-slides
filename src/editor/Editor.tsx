import React from 'react'
import '../common/styles/App.css'
import { ToolBar } from './toolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { Tabs } from '../types'

const chosenTab = React.createContext(Tabs.CREATE)
function Editor() {
	return (
		<chosenTab.Provider value={Tabs.CREATE}>
			<div className="App">
				<ToolBar></ToolBar>
				<WorkSpace></WorkSpace>
			</div>
		</chosenTab.Provider>
	)
}

export { Editor, chosenTab }
