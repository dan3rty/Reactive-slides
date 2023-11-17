import React from 'react'
import styles from './ToolBar.module.css'
import { TopBar } from './topBar/TopBar'
import { SettingBar } from './settingBar/SettingBar'

function ToolBar() {
	return (
		<div className={styles.toolBar}>
			<TopBar />
			<SettingBar />
		</div>
	)
}

export { ToolBar }
