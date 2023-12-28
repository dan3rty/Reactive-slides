import styles from './ToolBar.css'
import { TopBar } from './TopBar/TopBar'
import { SettingBar } from './SettingBar/SettingBar'

type ToolBarProps = {
	slideRect: DOMRect
}

function ToolBar({ slideRect }: ToolBarProps) {
	return (
		<div className={styles.toolBar}>
			<TopBar />
			<SettingBar slideRect={slideRect} />
		</div>
	)
}

export { ToolBar }
