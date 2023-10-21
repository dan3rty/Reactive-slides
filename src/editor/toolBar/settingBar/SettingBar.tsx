import React from 'react'
import './SettingBar.css'
import { EditBar } from './editBar/EditBar'
import { FileSettings } from './fileSettings/FileSettings'
import { AddBar } from './addBar/AddBar'
import { Tabs } from '../../../types'

type SettingBarProps = {
	chosenTab: Tabs
}

function SettingBar(props: SettingBarProps) {
	if (props.chosenTab == Tabs.CREATE) {
		return (
			<div className="SettingBar">
				<AddBar></AddBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
	if (props.chosenTab == Tabs.EDIT) {
		return (
			<div className="SettingBar">
				<EditBar></EditBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
	if (props.chosenTab == Tabs.ANIMATION) {
		return <div></div>
	} else {
		return <div></div>
	}
}

export { SettingBar }
