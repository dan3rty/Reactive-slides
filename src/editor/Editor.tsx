import React from 'react'
import styles from '../common/styles/App.module.css'
import { ToolBar } from './toolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'

function Editor() {
	return (
		<div className={styles.App}>
			<ToolBar></ToolBar>
			<WorkSpace></WorkSpace>
		</div>
	)
}

export { Editor }
