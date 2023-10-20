import React from 'react'
import './SettingBar.css'
import { EditBar } from './editBar/EditBar'
import { FileSettings } from './fileSettings/FileSettings'
import { AddBar } from './addBar/AddBar'
import {Tabs} from "../../../types";

function SettingBar() {
	const tab = Tabs.EDIT
	if (tab == Tabs.CREATE) {
		return (
			<div className="SettingBar">
				<AddBar></AddBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
	if (tab == Tabs.EDIT) {
		return (
			<div className="SettingBar">
				<EditBar></EditBar>
				<FileSettings></FileSettings>
			</div>
		)
	}
}

export { SettingBar }
