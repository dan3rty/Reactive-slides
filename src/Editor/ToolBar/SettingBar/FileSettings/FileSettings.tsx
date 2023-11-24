import React, { useContext } from 'react'
import styles from './FileSettings.module.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { CreateIcon, OpenIcon, SaveIcon } from '../../../../common/Icons/icons'
import { savePresentationToFile } from './FileManage'
import { PresenterContext } from '../../../../App'
import { OperationHistory, Presentation, Selection, Tabs } from '../../../../types'

function FileInput() {
	const setPresentation = useContext(PresenterContext).setPresenter

	function onChange(event) {
		const reader = new FileReader()
		const file = event.target.files[0]
		reader.readAsText(file)
		reader.onload = () => {
			const presentation: Presentation = JSON.parse(reader.result)
			console.log(presentation)
			const selection: Selection = {
				selectedTab: Tabs.CREATE,
				slideId: presentation.slides[1].id,
			}
			const OperationHistory: OperationHistory = {
				operations: [],
			}
			setPresentation({ presentation, selection, OperationHistory })
		}
	}

	return (
		<input
			style={{ visibility: 'hidden', position: 'absolute' }}
			type={'file'}
			onChange={onChange}
		/>
	)
}

function FileSettings() {
	const log = () => {
		console.log('pop')
	}

	const presentation = useContext(PresenterContext).presenter.presentation

	function onClick(): void {
		savePresentationToFile(presentation)
	}

	return (
		<div className={styles.fileSettings}>
			<Button
				style='dark'
				size='big'
				icon={CreateIcon}
				text='create new file'
				onClick={log}
			/>
			<label>
				<Button style='dark' size='big' icon={OpenIcon} text='open file' onClick={log} />
				<FileInput />
			</label>
			<Button style='dark' size='big' icon={SaveIcon} text='save file' onClick={onClick} />
		</div>
	)
}

export { FileSettings }
