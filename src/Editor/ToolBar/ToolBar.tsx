import React from 'react'
import styles from './ToolBar.css'
import { TopBar } from './TopBar/TopBar'
import { SettingBar } from './SettingBar/SettingBar'

type ToolBarProps = {
	slideRect: DOMRect
	slideRefList: React.MutableRefObject<HTMLDivElement[]>
}

function ToolBar({ slideRect, slideRefList }: ToolBarProps) {
	return (
		<div className={styles.toolBar}>
			<TopBar slideRefList={slideRefList} />
			<SettingBar slideRect={slideRect} />
		</div>
	)
}

export { ToolBar }
