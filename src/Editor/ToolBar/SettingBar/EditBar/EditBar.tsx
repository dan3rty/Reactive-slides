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
import { FontFamily } from '../../../../types'
import styles from './EditBar.css'
import { HexAlphaColorPicker } from 'react-colorful'
import { useEffect, useRef, useState } from 'react'

function EditBar() {
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
					initialValue={544}
					suffix={'px'}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={397}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={0}
					suffix={'deg'}
				/>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={300}
					suffix={'px'}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={100}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Font size:'}
					type={'number'}
					size={'Medium'}
					initialValue={35}
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
							<HexAlphaColorPicker />
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
								right:
									window.innerWidth -
									buttonContainerEl.current.offsetWidth -
									buttonContainerEl.current.offsetLeft,
							}}
						>
							<HexAlphaColorPicker />
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
