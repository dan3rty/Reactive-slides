import styles from './ToolBar.css'
import { TopBar } from './TopBar/TopBar'
import { SettingBar } from './SettingBar/SettingBar'

type ToolBarProps = {
	slideRect: DOMRect
	editedSlideRef: HTMLDivElement
}

function ToolBar({ slideRect, editedSlideRef }: ToolBarProps) {
	return (
		<div className={styles.toolBar}>
			<TopBar />
			<SettingBar slideRect={slideRect} editedSlideRef={editedSlideRef} />
		</div>
	)
}

export { ToolBar }
