import styles from './AddBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import {
	ImageIcon,
	OvalIcon,
	SquareIcon,
	TextIcon,
	TriangleIcon,
} from '../../../../common/Icons/icons'
import { useEffect, useRef, useState } from 'react'
import { useObjectCreation } from '../../../../hooks/useObjectCreation'
import { ChangeBackgroundPopup } from '../../../../common/changeBackgroundPopup/ChangeBackgroundPopup'

type AddBarProps = {
	slideRect: DOMRect
}

function AddBar({ slideRect }: AddBarProps) {
	const [imagePathInputOpened, setImagePathInputOpened] = useState(false)
	const imagePathInputRef = useRef(null)
	const [isBackgroundColorPicker, setStateBackgroundColorPicker] = useState(false)
	const backgroundColorPickerRef = useRef(null)
	const buttonContainerEl = useRef<HTMLDivElement>(null)
	const toggleBackgroundColorPickerState = () => setStateBackgroundColorPicker((state) => !state)

	const { handleAddDown, setBlockType, setImageValue } = useObjectCreation({
		rect: slideRect,
	})

	const handleWindowClick = (event: MouseEvent) => {
		if (
			backgroundColorPickerRef.current &&
			!backgroundColorPickerRef.current.contains(event.target)
		) {
			setStateBackgroundColorPicker(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleWindowClick)
		return () => document.removeEventListener('mousedown', handleWindowClick)
	}, [])

	function handleDownInInput(event: MouseEvent) {
		if (event.target !== imagePathInputRef.current) {
			document.removeEventListener('mousedown', handleDownInInput)
			setImagePathInputOpened(false)
		}
	}

	const fileInputRef = useRef<HTMLInputElement>()
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
			{!imagePathInputOpened && (
				<Button
					style='light'
					size='big'
					icon={ImageIcon}
					text='URL image'
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
						setImageValue(e.target.value)
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
			<Button
				style='light'
				size='big'
				icon={ImageIcon}
				text='File image'
				onClick={() => {
					fileInputRef.current.click()
				}}
			/>
			<input
				type={'file'}
				hidden={true}
				ref={fileInputRef}
				onInput={() => {
					if (fileInputRef.current) {
						const file = fileInputRef.current.files[0]

						const reader = new FileReader()

						reader.readAsDataURL(file)

						reader.onload = () => {
							if (typeof reader.result === 'string') {
								setBlockType('image')
								setImageValue(reader.result)
								document.addEventListener('mousedown', handleAddDown)
							}
						}

						reader.onerror = () => {
							console.log(reader.error)
						}
					}
				}}
			/>
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
			<div ref={buttonContainerEl}>
				<Button
					text={'Background'}
					style={'light'}
					size={'medium'}
					onClick={toggleBackgroundColorPickerState}
				/>
				{isBackgroundColorPicker && (
					<div
						ref={backgroundColorPickerRef}
						className={styles.colorPicker}
						style={{
							top:
								buttonContainerEl.current.offsetHeight +
								buttonContainerEl.current.offsetTop +
								10,
							right: 0,
						}}
					>
						<ChangeBackgroundPopup />
					</div>
				)}
			</div>
		</div>
	)
}

export { AddBar }
