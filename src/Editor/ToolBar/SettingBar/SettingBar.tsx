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
