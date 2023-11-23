import React from 'react'
import styles from '../common/Styles/App.module.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'

function Editor() {
	return (
		<div className={styles.App}>
			<ToolBar />
			<WorkSpace />
		</div>
	)
}

export { Editor }
