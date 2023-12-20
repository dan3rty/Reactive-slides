import styles from './SettingBar.css'
import { EditBar } from './EditBar/EditBar'
import { FileSettings } from './FileSettings/FileSettings'
import { AddBar } from './AddBar/AddBar'
import { AnimationBar } from './AnimationBar/AnimationBar'
import { Slide, Tabs } from '../../../types'
import { useAppSelector } from '../../../redux/hooks'

function SettingBar() {
	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const curChosen = selection.selectedTab
	const chosenSlide = selection.slideId
	const curSlide: Slide = slides.find((slide) => slide.id === chosenSlide)
	const selectedObject = curSlide?.objects.find((object) => object.id == selection.objectsId[0])
	let bar = <AddBar />
	switch (curChosen) {
		case Tabs.CREATE:
			bar = <AddBar />
			break
		case Tabs.EDIT:
			bar = <EditBar selectedObject={selectedObject} />
			break
		case Tabs.ANIMATION: {
			const chosenState = selection.keyFrameId
			bar = <AnimationBar selectedObject={selectedObject} chosenState={chosenState} />
			break
		}
		default:
			bar = null
	}
	return (
		<div className={styles.settingBar}>
			{bar}
			<FileSettings />
		</div>
	)
}

export { SettingBar }
