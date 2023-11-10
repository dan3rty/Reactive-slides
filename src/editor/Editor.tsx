import React, { useContext } from 'react'
import '../common/styles/App.css'
import { ToolBar } from './toolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { Tabs } from '../types'
import { presentation } from '../App'

const chosenTab = React.createContext(Tabs.CREATE)
function Editor() {
	const selectedTab = useContext(presentation).selection.selectedTab
	return (
		<chosenTab.Provider value={selectedTab}>
			<div className='App'>
				<ToolBar></ToolBar>
				<WorkSpace></WorkSpace>
			</div>
		</chosenTab.Provider>
	)
}

export { Editor, chosenTab }
