import React from 'react'
import './SettingBar.css'
import { FileSettings } from './fileSettings/FileSettings'
import { AddBar } from './addBar/AddBar'
function SettingBar() {
	return (
		<div className="SettingBar">
			<AddBar></AddBar>
			<FileSettings></FileSettings>
		</div>
	)
}

export { SettingBar }
