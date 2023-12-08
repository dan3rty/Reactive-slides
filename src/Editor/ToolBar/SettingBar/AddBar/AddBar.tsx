import styles from './AddBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import {
	ArrowIcon,
	BulletListIcon,
	ImageIcon,
	NumberedListIcon,
	OvalIcon,
	SquareIcon,
	TableIcon,
	TextIcon,
	TriangleIcon,
} from '../../../../common/Icons/icons'
import { useContext, useRef, useState } from 'react'
import { PresenterContext } from '../../../../presenterContext/PresenterContext'
import { useObjectCreation } from '../../../../hooks/useObjectCreation'

function AddBar() {
	const [imagePathInputOpened, setImagePathInputOpened] = useState(false)
	const { editedSlideRef } = useContext(PresenterContext)
	const rect = editedSlideRef.current.getBoundingClientRect()

	const imagePathInputRef = useRef(null)

	const { handleAddDown, setBlockType, setImagePathInput } = useObjectCreation({ rect })

	function handleDownInInput(event: MouseEvent) {
		if (event.target !== imagePathInputRef.current) {
			document.removeEventListener('mousedown', handleDownInInput)
			setImagePathInputOpened(false)
		}
	}

	return (
		<div className={styles.addBar}>
			<Button
				style='light'
				size='big'
				icon={TextIcon}
				text='text'
				onClick={() => {
					setBlockType('text')
					document.addEventListener('mousedown', handleAddDown)
				}}
			/>
			<Button style='light' size='big' icon={TableIcon} text='table' />
			<Button
				style='light'
				size='big'
				icon={TriangleIcon}
				text='triangle'
				onClick={() => {
					setBlockType('triangle')
					document.addEventListener('mousedown', handleAddDown)
				}}
			/>
			<Button style='light' size='big' icon={BulletListIcon} text='bullet list' />
			{!imagePathInputOpened && (
				<Button
					style='light'
					size='big'
					icon={ImageIcon}
					text='image'
					onClick={() => {
						setImagePathInputOpened(true)
						document.addEventListener('mousedown', handleDownInInput)
					}}
				/>
			)}
			{imagePathInputOpened && (
				<input
					className={styles.imagePathInput}
					ref={imagePathInputRef}
					placeholder={'URL to image'}
					onChange={(e) => {
						setImagePathInputOpened(false)
						setBlockType('image')
						setImagePathInput(e.target.value)
						document.addEventListener('mousedown', handleAddDown)
					}}
				/>
			)}
			<Button
				style='light'
				size='big'
				icon={SquareIcon}
				text='rectangle'
				onClick={() => {
					setBlockType('rectangle')
					document.addEventListener('mousedown', handleAddDown)
				}}
			/>
			<Button style='light' size='big' icon={NumberedListIcon} text='numbered list' />
			<Button style='light' size='big' icon={ArrowIcon} text='arrow' />
			<Button
				style='light'
				size='big'
				icon={OvalIcon}
				text='oval'
				onClick={() => {
					setBlockType('oval')
					document.addEventListener('mousedown', handleAddDown)
				}}
			/>
		</div>
	)
}

export { AddBar }
