import React, { useContext } from 'react'
import styles from './SettingBar.module.css'
import { EditBar } from './EditBar/EditBar'
import { FileSettings } from './FileSettings/FileSettings'
import { AddBar } from './AddBar/AddBar'
import { AnimationBar } from './AnimationBar/AnimationBar'
import { Tabs } from '../../../types'
import { PresenterContext } from '../../../App'

function SettingBar() {
	const curChosen = useContext(PresenterContext).presenter.selection.selectedTab
	const { selection, presentation } = useContext(PresenterContext).presenter
	const chosenSlide = selection.slideId
	const chosenObjectId = selection.objectsId
	const curSlide = presentation.slides.find((slide) => slide.id === chosenSlide)
	let bar = <AddBar />
	switch (curChosen) {
		case Tabs.CREATE:
			bar = <AddBar />
			break
		case Tabs.EDIT:
			bar = <EditBar />
			break
		case Tabs.ANIMATION: {
			const chosenState = selection.keyFrameId
			bar = (
				<AnimationBar
					curSlide={curSlide}
					chosenObjectId={chosenObjectId}
					chosenState={chosenState}
				/>
			)
			break
		}
	}
	return (
		<div className={styles.SettingBar}>
			{bar}
			<FileSettings />
		</div>
	)
}

export { SettingBar }
