import { Button } from '../../../../common/Components/Buttons/Button'
import { InputField } from '../../../../common/Components/InputFields/InputField'
import { FontFamilySelection } from '../../../../common/Components/Selection/FontFamilySelection'
import { SelectionBar } from '../../../../common/Components/Selection/SelectionBar'
import {
	AlignBottomIcon,
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	AlignTopIcon,
	BoldIcon,
	ItalicIcon,
	StrokethroughIcon,
	UnderstrokeIcon,
	VerticalAlignCenterIcon,
} from '../../../../common/Icons/icons'
import { FontFamily, ImageBlock, PrimitiveBlock, TextBlock } from '../../../../types'
import styles from './EditBar.css'
import { useEffect, useRef, useState } from 'react'
import { ColorPicker } from '../../../../common/changeBackgroundPopup/colorPicker/ColorPicker'
import { ChangeBackgroundPopup } from '../../../../common/changeBackgroundPopup/ChangeBackgroundPopup'

type EditBarProps = {
	selectedObject: TextBlock | PrimitiveBlock | ImageBlock
}

function EditBar({ selectedObject }: EditBarProps) {
	const [isTextColorPicker, setStateTextColorPicker] = useState(false)
	const [isBackgroundColorPicker, setStateBackgroundColorPicker] = useState(false)

	const toggleTextColorPickerState = () => setStateTextColorPicker((state) => !state)
	const toggleBackgroundColorPickerState = () => setStateBackgroundColorPicker((state) => !state)

	const textColorPickerRef = useRef(null)
	const backgroundColorPickerRef = useRef(null)

	const buttonContainerEl = useRef<HTMLDivElement>(null)

	const handleWindowClick = (event: MouseEvent) => {
		if (textColorPickerRef.current && !textColorPickerRef.current.contains(event.target)) {
			setStateTextColorPicker(false)
		}
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
	return (
		<div className={styles.editBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={selectedObject.baseState.x}
					suffix={'px'}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={selectedObject.baseState.y}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject.baseState.rotation}
					suffix={'deg'}
				/>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject.baseState.width}
					suffix={'px'}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject.baseState.height}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Font size:'}
					type={'number'}
					size={'Medium'}
					initialValue={0}
					suffix={'px'}
				></InputField>
				<FontFamilySelection value={FontFamily.ARIAL} />
				<div className={styles.buttonHorizontalContainer} ref={buttonContainerEl}>
					<Button
						text={'Text color'}
						style={'light'}
						size={'medium'}
						onClick={toggleTextColorPickerState}
					/>
					{isTextColorPicker && (
						<div
							ref={textColorPickerRef}
							className={styles.colorPicker}
							style={{
								top:
									buttonContainerEl.current.offsetHeight +
									buttonContainerEl.current.offsetTop +
									10,
								left: buttonContainerEl.current.offsetLeft,
							}}
						>
							<ColorPicker
								onColorPick={(color) => {
									console.log(color)
								}}
							/>
						</div>
					)}
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
			<div className={styles.buttonVerticalContainer}>
				<Button style={'light'} size={'small'} icon={BoldIcon} />
				<Button style={'light'} size={'small'} icon={ItalicIcon} />
				<Button style={'light'} size={'small'} icon={UnderstrokeIcon} />
				<Button style={'light'} size={'small'} icon={StrokethroughIcon} />
			</div>
			<div className={styles.selectionWrapper}>
				<Button text={'clear'} style={'light'} size={'medium'} icon={BoldIcon} />
				<SelectionBar icons={[AlignRightIcon, AlignCenterIcon, AlignLeftIcon]} />
				<SelectionBar icons={[AlignTopIcon, VerticalAlignCenterIcon, AlignBottomIcon]} />
			</div>
		</div>
	)
}

export { EditBar }
