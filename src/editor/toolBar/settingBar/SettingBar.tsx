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
	return (
		<div className={styles.SettingBar}>
			{curChosen == Tabs.CREATE ? (
				<AddBar />
			) : curChosen == Tabs.EDIT ? (
				<EditBar />
			) : (
				<AnimationBar />
			)}
			<FileSettings />
		</div>
	)
}

export { SettingBar }
