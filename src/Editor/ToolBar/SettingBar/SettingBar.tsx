import styles from './SettingBar.css'
import { EditBar } from './EditBar/EditBar'
import { FileSettings } from './FileSettings/FileSettings'
import { AddBar } from './AddBar/AddBar'
import { AnimationBar } from './AnimationBar/AnimationBar'
import { Tabs } from '../../../model/types'
import { useAppSelector } from '../../../redux/hooks'

type SettingBarProps = {
	slideRect: DOMRect
	editedSlideRef: HTMLDivElement
}

function SettingBar({ slideRect, editedSlideRef }: SettingBarProps) {
	const selection = useAppSelector((state) => state.selection)
	const curChosen = selection.objectId ? selection.selectedTab : Tabs.CREATE
	let bar = null
	switch (curChosen) {
		case Tabs.CREATE:
			bar = <AddBar slideRect={slideRect} editedSlideRef={editedSlideRef} />
			break
		case Tabs.EDIT:
			bar = <EditBar />
			break
		case Tabs.ANIMATION: {
			bar = <AnimationBar />
			break
		}
	}
	return (
		<div className={styles.settingBar}>
			{bar}
			<FileSettings />
		</div>
	)
}

export { SettingBar }
