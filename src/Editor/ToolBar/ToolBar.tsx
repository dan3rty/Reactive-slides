import React from 'react'
import styles from './ToolBar.module.css'
import { TopBar } from './TopBar/TopBar'
import { SettingBar } from './SettingBar/SettingBar'

function ToolBar() {
	return (
		<div className={styles.toolBar}>
			<TopBar />
			<SettingBar />
		</div>
	)
}

export { ToolBar }
