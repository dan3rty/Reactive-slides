import styles from './FileSettings.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { CreateIcon, OpenIcon, SaveIcon } from '../../../../common/Icons/icons'
import { useSavePresentationToFile, useLoadPresentation } from '../../../../hooks/useFileIO'
import { useAppActions } from '../../../../redux/hooks'

function FileInput() {
	const load = useLoadPresentation()
	return (
		<input
			style={{ visibility: 'hidden', position: 'absolute' }}
			type={'file'}
			accept={'.json'}
			onChange={(event) => load(event)}
		/>
	)
}

function FileSettings() {
	const save = useSavePresentationToFile()
	const { createCreateBlankPresentationAction } = useAppActions()

	return (
		<div className={styles.fileSettings}>
			<Button
				style='dark'
				size='big'
				icon={CreateIcon}
				text='create new file'
				onClick={createCreateBlankPresentationAction}
			/>
			<label>
				<Button style='dark' size='big' icon={OpenIcon} text='open file' />
				<FileInput />
			</label>
			<Button style='dark' size='big' icon={SaveIcon} text='save file' onClick={save} />
		</div>
	)
}

export { FileSettings }
