import React, { useContext } from 'react'
import styles from './SettingBar.module.css'
import { EditBar } from './editBar/EditBar'
import { FileSettings } from './fileSettings/FileSettings'
import { AddBar } from './addBar/AddBar'
import { AnimationBar } from './animationBar/AnimationBar'
import { Tabs } from '../../../types'
import { presentation } from '../../../App'

function SettingBar() {
	const curChosen = useContext(presentation).selection.selectedTab
	//TODO: СДЕЛАТЬ СВИЧ
	let bar = <AddBar />
	switch (curChosen) {
		case Tabs.CREATE:
			bar = <AddBar />
			break
		case Tabs.EDIT:
			bar = <EditBar />
			break
		case Tabs.ANIMATION:
			bar = <AnimationBar />
			break
	}
	return (
		<div className={styles.SettingBar}>
			{bar}
			<FileSettings />
		</div>
	)
}

export { SettingBar }
