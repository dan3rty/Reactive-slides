import React, { useContext } from 'react'
import './SettingBar.css'
import { EditBar } from './editBar/EditBar'
import { FileSettings } from './fileSettings/FileSettings'
import { AddBar } from './addBar/AddBar'
import { Tabs } from '../../../types'
import { chosenTab } from '../../Editor'

function SettingBar() {
	const curChosen = useContext(chosenTab)
	if (curChosen == Tabs.CREATE) {
		return (
			<div className="SettingBar">
				<AddBar></AddBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
	if (curChosen == Tabs.EDIT) {
		return (
			<div className="SettingBar">
				<EditBar></EditBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
	if (curChosen == Tabs.ANIMATION) {
		return <div className="SettingBar"></div>
	} else {
		return <div className="SettingBar"></div>
	}
}

export { SettingBar }
