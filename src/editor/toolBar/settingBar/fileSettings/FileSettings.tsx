import React from 'react'
import styles from './FileSettings.module.css'
import { Button } from '../../../../common/components/buttons/Button'
import { CreateIcon, OpenIcon, SaveIcon } from '../../../../common/icons/icons'
function FileSettings() {
	return (
		<div className={styles.fileSettings}>
			<Button style='dark' size='big' icon={CreateIcon} text='create new file' />
			<Button style='dark' size='big' icon={OpenIcon} text='open file' />
			<Button style='dark' size='big' icon={SaveIcon} text='save file' />
		</div>
	)
}

export { FileSettings }
