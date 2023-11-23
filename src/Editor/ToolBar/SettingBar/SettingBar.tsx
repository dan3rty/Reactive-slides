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
	//TODO: СДЕЛАТЬ СВИЧ
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
