import React from 'react'
import styles from './FileSettings.module.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { CreateIcon, OpenIcon, SaveIcon } from '../../../../common/Icons/icons'
function FileSettings() {
	const log = () => {
		console.log("pop");
	}
	return (
		<div className={styles.fileSettings}>
			<Button style='dark' size='big' icon={CreateIcon} text='create new file' onClick={log} />
			<Button style='dark' size='big' icon={OpenIcon} text='open file' onClick={log} />
			<Button style='dark' size='big' icon={SaveIcon} text='save file' onClick={log} />
		</div>
	)
}

export { FileSettings }
